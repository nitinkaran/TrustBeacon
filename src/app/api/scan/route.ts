import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// --- Types for ESLint & TS ---
interface SerpApiReview {
  user: {
    name: string;
  };
  rating: number;
  snippet?: string;
  date: string;
}

interface SerpApiPlace {
  title: string;
  data_id?: string;
  rating?: number;
  reviews?: string | number;
}

// Server-side admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { url, userId } = await req.json();
    const apiKey = process.env.SERP_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key missing in .env.local" }, { status: 500 });
    }

    // --- STEP 1: URL Clean Up (Fujitsu & Coordinate Link Fix) ---
    let searchQuery = url;
    if (url.includes("/place/")) {
      try {
        // URL se business name nikalna: .../place/Business+Name/...
        const parts = url.split("/place/")[1].split("/");
        searchQuery = decodeURIComponent(parts[0].replace(/\+/g, " "));
      } catch (e) {
        searchQuery = url; // Fallback to original if split fails
      }
    }

    // --- STEP 2: Google Maps Data Fetching ---
    const searchRes = await fetch(
      `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(searchQuery)}&api_key=${apiKey}`
    );
    const searchData = await searchRes.json();

    const place = (searchData.place_results || (searchData.local_results ? searchData.local_results[0] : null)) as SerpApiPlace | null;
    
    if (!place || !place.data_id) {
      return NextResponse.json({ error: "Business ID not found. Try a cleaner link." }, { status: 400 });
    }

    // --- STEP 3: Reviews Fetching ---
    const reviewsRes = await fetch(
      `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=${place.data_id}&api_key=${apiKey}`
    );
    const reviewsData = await reviewsRes.json();

    const rawReviews: SerpApiReview[] = reviewsData.reviews || [];
    
    const formattedReviews = rawReviews.map((r: SerpApiReview) => ({
      user_id: userId,
      business_name: place.title,
      reviewer_name: r.user.name,
      rating: Math.round(Number(r.rating || 0)),
      review_text: r.snippet || "No text provided",
      date: r.date,
      sentiment: r.rating >= 4 ? "Positive" : r.rating <= 2 ? "Negative" : "Neutral"
    }));

    // --- STEP 4: Stats Calculation (NaN Safety) ---
    const rawRating = Number(place.rating) || 0;
    const trustScore = Math.round(rawRating * 20);
    
    const positiveCount = formattedReviews.filter(r => r.sentiment === 'Positive').length;
    const positiveRatio = formattedReviews.length > 0 
      ? Math.round((positiveCount / formattedReviews.length) * 100) 
      : 0;

    // --- STEP 5: Auto-Save to Supabase ---
    if (userId && formattedReviews.length > 0) {
      // 1. Save all reviews
      await supabaseAdmin.from('reviews').insert(formattedReviews);

      // 2. Data Cleaning for Business Stats
      const rawCount = place.reviews || "0";
      const officialCount = typeof rawCount === 'string' 
        ? parseInt(rawCount.replace(/[^0-9]/g, '')) 
        : Number(rawCount);

      // 3. Upsert Stats
      await supabaseAdmin.from('business_stats').upsert({
        user_id: userId,
        business_name: place.title,
        total_reviews: officialCount || formattedReviews.length,
        trust_score: trustScore,
        positive_ratio: positiveRatio,
        updated_at: new Date().toISOString()
      }, { 
        onConflict: 'user_id, business_name' 
      });
    }

    // --- Final Response ---
    return NextResponse.json({
      success: true,
      businessName: place.title,
      totalReviews: place.reviews || formattedReviews.length,
      score: trustScore,
      reviews: formattedReviews
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error occurred";
    console.error("Scraper Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}