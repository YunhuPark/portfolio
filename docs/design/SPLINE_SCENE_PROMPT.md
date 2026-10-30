# Spline AI Prompt — Reliability Core

Create a restrained, high-end 3D hero scene for an AI Engineer portfolio.

## Core concept

Visualize the transformation:

**CHAOTIC MODEL OUTPUT → VALIDATION → SECURITY → DEPLOYMENT → RELIABLE AI SYSTEM**

The scene must feel like an editorial research object or contemporary installation, not a cyberpunk game, neon metaverse, or generic AI brain.

## Art direction

- Background: transparent or deep charcoal `#11110F`
- Main accent: vermilion `#EF5B35`
- Secondary color: warm ivory `#FFFDF8`
- Muted metal: dark graphite `#28241F`
- Lighting: soft, cinematic, low contrast
- Materials: translucent glass, dark brushed metal, thin ivory wireframe
- Mood: analytical, calm, technical, premium
- Avoid blue gradients, rainbow neon, glossy toy materials, and excessive bloom

## Objects and hierarchy

Create these groups and use these exact names:

1. `Reliability_Core`
   - A floating translucent sphere or irregular geometric core
   - Warm vermilion inner light
   - Subtle breathing pulse
   - Represents the final reliable AI system

2. `Ring_Validation`
   - Thin ivory orbital ring
   - Slightly tilted
   - Slow clockwise rotation

3. `Ring_Security`
   - Thin vermilion orbital ring
   - Different axis from validation ring
   - Slow counter-clockwise rotation

4. `Ring_Deployment`
   - Larger dark-metal or faint ivory ring
   - Slowest rotation
   - Creates depth without visual noise

5. `Data_Shards`
   - 20–30 small irregular fragments or points around the core
   - Begin scattered and slightly unstable
   - Transition into cleaner circular paths around the core

6. `Axis_Lines`
   - Very thin horizontal and vertical guide lines
   - Low opacity
   - Similar to a technical diagram or research instrument

7. `Project_Algo`
   - Four minimal wireframe nodes connected in sequence
   - Third node highlighted vermilion
   - Represents Collect → Generate → Verify → Operate

8. `Project_Medi`
   - Abstract paired volume resembling two lung lobes
   - Mostly ivory particles or wireframe
   - One small vermilion lesion region
   - Do not make it look like a real diagnostic product

9. `Project_Insight`
   - Three vertical columns with relative heights 2.1, 1.0, 0.63
   - First column vermilion, others muted ivory
   - Represents naive comparison → controlled analysis

Only `Reliability_Core`, the three main rings, `Data_Shards`, and `Axis_Lines` should be visible by default. The homepage has three selected project states; IMST-Mamba is presented as a related research note inside the HTML portfolio rather than a fourth homepage scene.

## States

Create the following scene states:

### `Hero_Chaotic`
- Data shards are scattered
- Core light is dimmer
- Rings rotate independently

### `Hero_Verified`
- Data shards align into clean orbits
- Core becomes brighter and more stable
- Rings visually converge around the core

### `Algo_State`
- Show `Project_Algo`
- Keep the main core faintly visible
- Hide other project groups

### `Medi_State`
- Show `Project_Medi`
- Keep the main core faintly visible
- Hide other project groups

### `Insight_State`
- Show `Project_Insight`
- Keep the main core faintly visible
- Hide other project groups

## Interactions

### Page load
- Start in `Hero_Chaotic`
- After a short delay, transition gently toward a partially verified state
- No dramatic intro or fast camera movement

### Pointer / touch
- Use a subtle global Look At or Follow interaction
- Maximum rotation should be very small
- The object should feel inspected, not spun like a game asset

### Scroll
- Transition from `Hero_Chaotic` to `Hero_Verified`
- Scattered fragments gradually align into orbit
- Core brightness increases slightly

### Reduced motion
- Ensure the scene remains visually complete when animation is disabled
- Use a stable three-quarter camera angle

## Camera

- Perspective camera
- Three-quarter view
- Core centered slightly right of frame
- Leave generous empty space on the left for HTML typography
- Do not allow orbit, zoom, or pan in the final embed
- Maintain composition at desktop and mobile sizes

## Performance limits

- Maximum 30 data shards
- Maximum 3 main ring meshes
- Use simple geometry
- No high-resolution textures
- Maximum 2 lights
- Minimal or no post-processing
- Avoid physics simulation
- Avoid shadows if they noticeably increase load
- Target a lightweight web export

## Final appearance

The result should feel like a kinetic scientific instrument that explains reliability engineering:

- raw and uncertain data outside
- validation and security rings in the middle
- a stable, warm core at the center

It must complement a dark editorial portfolio with oversized typography and warm off-white content sections.
