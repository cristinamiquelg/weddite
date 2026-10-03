// Prompt sent to OpenAI's image-edit endpoint, together with two input images:
//   1. the couple's photo (what to draw), and
//   2. a style sheet with the template's own illustrations (how to draw it;
//      see story-style-reference.ts).
// Turns the photo into the line illustration shown in "Nuestra historia".
export const STORY_ILLUSTRATION_PROMPT = `Redraw the FIRST image (a photograph of a couple) as a hand-drawn pen line illustration, in exactly the same style as the SECOND image.

The SECOND image is a style sheet of illustrations from the same wedding website (a church, a woman seen from behind, a country house). Use it ONLY as a style reference: copy its linework, its colour and its level of detail. Do NOT copy its subjects. The result must look as if the same illustrator had drawn it.

STYLE (match the second image)
- Fine ink-pen line art, drawn by hand. It is made of OUTLINES: clean contour lines plus a modest amount of small, deliberate interior detail (a few folds in the clothes, hair shown as a handful of separate flowing lines, a few short strokes for texture).
- Line weight: thin to medium and fairly even, with gentle natural variation and slightly rounded, open line endings. NOT a thick brush, NOT a marker, NOT calligraphy.
- Slightly imperfect and organic, never vector-perfect, never mechanical.
- Level of detail: like the reference. More than a minimal doodle, far less than a realistic drawing.

NO FILLS (very important)
- Never fill any shape with solid colour or ink. Hair, clothes, trousers, skin and ground are described ONLY by their outline and a few interior lines; their insides stay empty (transparent).
- No blobs of ink, no flat colour areas, no dense scribbles, no shading, no gradients, no hatching masses, no shadows.

COLOUR
- One single colour for every line: muted coral red, exactly #DD3E3E (RGB 221, 62, 62), the same red as in the second image. Not orange, not vermilion, not bright red, not pink. Nothing else: no black, no grey, no other colour.

SUBJECT
- Stay faithful to the photograph: the pose, the composition, how the two people sit or stand relative to each other, their proportions, their hairstyles and the outline of their clothes. They must be recognisable as this couple through silhouette and gesture.
- No realistic faces. Show faces with a few minimal marks at most, or leave them out if the people are seen from behind.
- Keep the couple as the only focus, centred, with generous empty space around them.

ENVIRONMENT
- At most a little ground at their feet: a short line with a few small grass strokes, in the manner of the ground strokes under the church in the second image.
- NO sky, NO clouds, NO horizon lines, NO hills, NO trees, NO background scenery and no floating strokes in the air.

CANVAS
- Transparent background (otherwise plain white). No frame, no text, no signature, no paper texture, no photographic lighting.

Final check before you answer: the lines are thin-to-medium pen lines, nothing is filled in, the colour is #DD3E3E, and it sits naturally next to the church and the country house of the second image.`;
