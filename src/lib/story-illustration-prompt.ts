// Prompt sent to OpenAI's image-edit endpoint, together with the couple's
// photo, to turn it into the line illustration shown in "Nuestra historia".
export const STORY_ILLUSTRATION_PROMPT = `Create a minimalist expressive brush-line illustration based on the uploaded photograph.

IMPORTANT: The uploaded photograph is ONLY a reference for the subject, composition, pose and recognizable shapes. Do NOT reproduce the photograph literally and do NOT try to draw all of its visible details.

The final image must look like a spontaneous hand-drawn illustration made with a red/coral brush pen, NOT like a pencil sketch, engraving, charcoal drawing, ink wash, etching or detailed drawing.

STYLE

Use a single warm coral-red / vermilion color.

The illustration should consist primarily of loose, confident brush strokes.

The strokes must feel:
- spontaneous
- fluid
- organic
- slightly imperfect
- expressive
- gestural
- elegant
- lightweight

Use strong variation in line weight. Some strokes are thin and delicate, while others are thicker and more expressive. Allow the thickness to change naturally within individual strokes.

The line should have the feeling of a real brush moving across paper.

IMPORTANT: the stroke should be CLEAN and OPEN, not textured.

Do NOT create pencil grain.
Do NOT create sketchy pencil marks.
Do NOT use hatching.
Do NOT use cross-hatching.
Do NOT use repeated parallel lines.
Do NOT shade objects with many small strokes.
Do NOT fill surfaces with lines.
Do NOT create a detailed pencil drawing.

The illustration should use a relatively SMALL NUMBER OF STROKES.

ABSTRACTION

Simplify the photograph aggressively.

The goal is to capture the ESSENCE of the scene, not to reproduce its information.

Prioritize:

1. Overall silhouette
2. Main gesture and pose
3. Important contours
4. A few distinctive characteristics
5. A very small number of environmental strokes

Everything else should disappear.

When a detail is not necessary to recognize the subject, OMIT IT.

When choosing between adding another line and leaving an area empty, LEAVE IT EMPTY.

The final image should feel intentionally unfinished in places.

PEOPLE

If people are present, preserve their overall body position, posture, proportions, hairstyle silhouette and relationship to one another.

Do not draw realistic facial features.

Do not draw individual hairs.

Do not draw realistic skin.

Do not reproduce every fold in their clothes.

Represent clothing with only a few flowing contour strokes.

The couple should be recognizable primarily through their silhouettes, pose and interaction.

ENVIRONMENT

Treat the environment extremely minimally.

Do not reproduce every blade of grass, hill, tree, cloud or landscape contour.

Represent the landscape using only a few long, loose, gestural strokes.

The background should be mostly EMPTY.

For distant hills, use one or two irregular horizontal strokes.

For grass or ground, use only a few expressive marks near the bottom of the composition.

Do not fill the background with repeated sketch marks.

COMPOSITION

Preserve the main composition of the photograph.

Keep the couple as the clear visual focus.

Allow large areas of empty space around them.

Do not invent additional objects.

Do not add decorative elements that are not necessary.

Do not make the illustration visually dense.

LINE CHARACTER

The line must NOT look like a vector outline.

It should have:
- variable pressure
- occasional thicker sections
- occasional very thin sections
- slightly irregular curves
- loose endings
- occasional interrupted contours
- subtle overlaps
- expressive changes of direction

However, keep the overall drawing SIMPLE and CONTROLLED.

The imperfections should come from the brush movement, NOT from adding lots of extra sketch lines.

COLOR

Use ONLY one line color:

warm coral red / vermilion.

No orange.
No yellow.
No brown.
No black.
No secondary colors.

BACKGROUND

Transparent background if supported.

Otherwise use a completely plain white or very light background.

Do not reproduce the photographic sky, lighting, haze or photographic colors.

Do not use gradients.

Do not use shadows.

Do not use solid color fills.

Do not use realistic lighting.

FINAL VISUAL TARGET

The final result should resemble an elegant spontaneous red brush illustration made from a small number of expressive strokes.

It should feel closer to a loose botanical or fashion illustration than to a pencil drawing.

It should be:
minimal
airy
expressive
organic
elegant
slightly imperfect
abstract but recognizable

It should NOT be:
photorealistic
detailed
pencil-like
textured
shaded
hatched
cross-hatched
technical
architectural
cartoon-like
or overly polished.

MOST IMPORTANT RULE:

LESS LINES.

LESS DETAIL.

MORE GESTURE.

When in doubt, remove the line.

The photograph should be recognizable through the few strokes that remain, not through the number of strokes used.`;
