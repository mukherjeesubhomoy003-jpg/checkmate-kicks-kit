# Big Restructure Plan

This is a large multi-area change. I'll split it into phases so you can approve/adjust before I code. Please confirm the counts and a few clarifications at the end.

## 1. Catalogue restructure — 4 new sections with their own pages

New category routes replacing the single WC grid on home:
```
/player-version    (existing WC jerseys, minus duplicates)
/fan-version       (new — 13 jerseys from screenshot 4, ₹750)
/shorts            (Coming Soon page)
/posters           (existing posters moved here, ₹99 + shipping)
```

Home page: hero (unchanged) → Special Editions → **4 category tiles** (image + name) that route to each page above. Tapping a tile opens its dedicated page.

## 2. Special Editions updates

Add 3 new PV cards at ₹850 (Spain white PV, Mexico De Oro black/gold, Turkey Nike white) using your 3 uploaded jersey images.

Move **Brasil Away (Jordan navy)** OUT of the PV grid INTO Special Editions at **₹800**.

Size rules (special-edition items only):
- Argentina Home Full Sleeve → M, L, XL
- Portugal Blackout Full Sleeve → L, XL
- Argentina Practice PV → M, L

## 3. Fan Version jerseys (₹750, new page)

I'll extract the 13 jerseys from screenshot 4 individually and label them. My read of the grid (please correct any wrong names):
1. Germany Home Away Navy
2. England Home Red
3. Japan Away White
4. Spain Home Red
5. Brasil Away Navy
6. Jamaica Home Yellow
7. Jamaica Away Black
8. Argentina Away Black/Blue (floral)
9. Italy Home Blue
10. Spain Away White
11. Portugal Home Red (Puma)
12. Portugal Away White/Teal
13. Argentina Home White/Blue

I'll add each as a separate asset upload (`f01`–`f13`).

## 4. Player Version cleanup

Remove exact-duplicate entries in `jerseys.ts` (I see several — e.g. multiple Portugal Away, Brasil Away, France Away). I will only remove duplicates, not distinct designs, per your instruction.

## 5. Posters

New `/posters` page with existing 3 posters. Price shown as **₹99 + shipping** (shipping charge unchanged in checkout). Remove posters block from home body.

## 6. Navigation bar

- Add **Search** button (opens overlay searching jerseys by team/tag/section)
- Remove **Contact** button

## 7. Home banner (screenshot 5 — gold "Player Edition World Cup 2026")

Remove that gold banner. Replace with a clean, professional intro block: brand logo + tagline + a slim orange/black accent bar. No gold.

## 8. Photo reviews (customer uploads)

Add a review form on product/home:
- Name, rating, text, **photo upload**
- On submit → saved to Lovable Cloud (new `reviews` table + `review-photos` storage bucket)
- Auto-appears on the site immediately (no moderation)

DB: `public.reviews (id, name, rating, text, photo_url, created_at)` with public SELECT + authenticated INSERT policies, plus GRANTs. Public bucket for photos.

*Note: no moderation means anyone can post anything publicly. I recommend a hidden-by-default flag + admin approval — say the word and I'll add it.*

## 9. Mobile polish

- Shrink jersey card typography on mobile (`font-bebas text-sm` names, tighter padding)
- Fix header button overlap (grid layout, min-w-0, shrink-0 per responsive rules)
- Ensure order modal buttons don't collide
- Test WC hero banner + section headers at 375px width

## 10. Admin panel

Add the 4 categories (PV / Fan / Shorts / Posters) as filters/tabs in the existing admin products page so each catalogue is manageable. Stock table extended for fan version items.

---

## Please confirm before I build

1. **Fan version names** — is my list in section 3 correct? Any renames?
2. **Reviews moderation** — auto-publish, or admin-approve first? (I strongly recommend approval)
3. **Shorts page** — just a "Coming Soon" splash for now, correct?
4. **Search scope** — search all 4 catalogues (jerseys + posters) by team name?

Once you confirm these 4, I'll implement everything end-to-end in one pass.
