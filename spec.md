# Birthday Wishes for KAMALI

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- A fully frontend-driven, 8-slide birthday wish website for KAMALI from GOWTHAM (Lucky)
- Red and black romantic theme with neon glow effects
- Fullscreen slide-based layout (no scrolling, page-by-page transitions)
- Floating balloon animations, confetti/paper pop effects on every slide
- Birthday music auto-plays in background (Web Audio API synthesized birthday tune)
- Slide navigation with lovable button words (not "Previous"/"Next") like "More Love", "Open Your Heart", etc.
- KAMALI's name prominently displayed on every slide
- 8-dot pagination indicator

**Slide Content:**
1. **Welcome Slide** - Grand opening, Happy Birthday KAMALI, GOWTHAM's name, begin journey button, balloons fill screen
2. **Love Letter Slide** - Simple heartfelt words, not a traditional love letter, simple lines about her meaning to him
3. **Why She Is My Everything** - Her role in his life, simple short lines, warm and emotional
4. **Birthday Date Celebration** - 30-10-2007 highlighted grandly, age reveal, special milestone celebration
5. **Memories & Moments** - Short sweet lines about their bond, Lucky (GOWTHAM) expressing his heart
6. **Balloon Party Slide** - Full-screen balloon explosion, Happy Birthday text floating, confetti burst, very visual
7. **Message Page** - Input field for user to type a message, display it with GOWTHAM's name attribution below, simple and elegant
8. **Future Wishes** - Grand wishes for KAMALI's ambitions: Lawyer and IAS, motivational and loving words, last slide loops back to first

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Generate Motoko backend to store messages from slide 7 (saveMessage, getMessages)
2. Build App.tsx with slide state management, transition logic
3. Build 8 individual slide components with unique content and animations
4. Implement CSS animations: floating balloons, confetti particles, glowing text
5. Implement synthesized birthday music using Web Audio API
6. Style with red/black/neon-red theme using Tailwind + custom CSS
7. Wire slide 7 message input to backend
8. Last slide next button loops to slide 1
