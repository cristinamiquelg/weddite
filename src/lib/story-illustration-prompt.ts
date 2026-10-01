// Prompt sent to OpenAI's image-edit endpoint, together with the couple's
// photo, to turn it into the line illustration shown in "Nuestra historia".
export const STORY_ILLUSTRATION_PROMPT = `Create a minimalist hand-drawn line illustration based on the uploaded reference photograph.

The uploaded photograph is the SUBJECT REFERENCE. Reinterpret it as a loose, expressive editorial line drawing while preserving the subject's recognizable silhouette, proportions, pose, composition and most characteristic visual features.

VISUAL LANGUAGE

The illustration should have the visual language of an elegant spontaneous ink sketch, somewhere between fashion illustration, botanical drawing and loose architectural line art.

Use ONLY a single warm coral-red / vermilion line color.

The drawing should look genuinely hand-drawn with a flexible brush or ink pen. The stroke must feel organic, spontaneous and slightly imperfect.

Use clearly VARIABLE LINE WEIGHT throughout the illustration:
- some strokes should be very thin and delicate
- some strokes should become noticeably thicker
- some strokes should become heavier where the hand would naturally apply pressure
- allow subtle changes in pressure within the same line

The strokes should have:
- slight natural wobble
- irregular edges
- changes in pressure
- occasional overlaps
- small imperfections
- occasional broken or incomplete lines
- loose beginnings and endings
- a few spontaneous secondary strokes

Do NOT make the contours perfectly smooth, geometric or uniform.

The illustration should feel like it was drawn quickly and confidently by hand, rather than traced digitally.

ABSTRACTION AND DETAIL

Prioritize GESTURE, SILHOUETTE and CHARACTER over detail.

Simplify the photograph substantially.

Capture the overall shape and the few visual elements that make the subject immediately recognizable. Remove unnecessary details, textures, tiny objects, realistic surfaces and technical information.

The result should sit between a recognizable illustration and an expressive sketch.

The viewer should immediately understand what the subject is, but the drawing should not attempt to reproduce every element of the photograph.

When deciding whether to add a detail, prefer NOT adding it.

"Less information, more character."

Use generous negative space.

Allow some contours to remain open or only partially implied. Not every edge of the subject needs to be completely enclosed.

Do not over-explain the subject with lines.

LINE QUALITY

The line should resemble a real brush stroke rather than a vector path.

Avoid:
- perfectly uniform stroke widths
- perfectly smooth Bézier curves
- rigid geometric shapes
- technical drafting
- excessive symmetry
- excessive outlining
- dense cross-hatching
- realistic shading
- gradients
- solid fills
- photorealistic rendering
- cartoon-like thick outlines

Instead, use expressive single strokes and small clusters of loose marks.

Some areas can be more defined while others should dissolve into a few suggestive strokes.

The hierarchy of detail should be:
1. overall silhouette
2. distinctive shapes
3. important structural features
4. a few expressive secondary details
5. everything else omitted

COMPOSITION

Preserve the important composition of the uploaded photograph, but simplify it into a clean standalone illustration.

Do not unnecessarily add objects that are not present in the photograph.

If the photograph contains a person, preserve their pose, body proportions, hairstyle and clothing silhouette, but simplify facial features and small clothing details.

If the photograph contains architecture, preserve its main volumes, rooflines, windows, doors and characteristic architectural features, but reduce decorative and structural detail.

If the photograph contains landscape or vegetation, represent it with loose organic strokes rather than botanical precision.

If the photograph contains an object or vehicle, preserve its characteristic silhouette and major recognizable elements while simplifying mechanical or technical details.

BACKGROUND

Use a transparent background if supported.

If transparency is not available, use a completely plain background with no texture.

Do not add a frame, border, typography, labels or decorative background.

The illustration should work as an isolated graphic element.

COLOR

Use a single warm coral-red / vermilion color for all visible strokes.

No additional colors.

No black outlines.

No colored fills.

No gradients.

The background should remain transparent or completely plain.

OVERALL FEEL

The final result should feel:

elegant
artistic
editorial
organic
minimal
spontaneous
slightly raw
handmade
confident
airy

It should NOT feel:

technical
photorealistic
overly polished
geometric
generic
cartoonish
overly detailed
computer-generated
like a coloring-book outline

MOST IMPORTANT RULE

Prioritize gesture and silhouette over detail.

When in doubt, REMOVE a line rather than ADDING one.

The final illustration should look like an artist captured the essence of the photograph in a few expressive brush strokes, rather than carefully tracing the photograph.

SUBJECT-SPECIFIC INSTRUCTION

Transform the uploaded photograph into a line illustration of the subject shown in the photograph.

Preserve the subject's most recognizable characteristics while applying the exact visual language described above.`;
