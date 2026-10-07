# CampusPilot — Canonical Content Taxonomy Specification

**Version:** 1.0 (Phase 1 Baseline)  
**Author / Owner:** Angel (Team Lead, Product & Content)  
**Scope:** Universal taxonomy shared across Frontend filters, Backend storage, AI extraction, and Recommendation ranking.

---

## 1. Core Taxonomy Overview

CampusPilot recognizes **8 Primary Categories**. Each category has dedicated subcategories, semantic tags, and a defined role in student personalization versus institutional delivery.

| ID / Key | Display Name | Icon | Type | Personalization Role |
|---|---|---|---|---|
| `technical` | **Technical & Coding** | 💻 | Interest-driven | Ranked via Student Profile |
| `cultural` | **Cultural & Arts** | 🎭 | Interest-driven | Ranked via Student Profile |
| `sports` | **Sports & Esports** | 🏆 | Interest-driven | Ranked via Student Profile |
| `social` | **Social & Campus Life** | 🎉 | Interest-driven | Ranked via Student Profile |
| `career` | **Career & Internships** | 💼 | Interest-driven | Ranked via Student Profile / Urgency |
| `wellness` | **Wellness & Psychology** | 🧠 | Interest-driven | Ranked via Student Profile |
| `learning_research` | **Learning & Research** | 🔬 | Interest-driven | Ranked via Student Profile |
| `important_campus` | **Important Campus** | 📢 | Institutional | **Bypasses Interest Filter** (Always eligible) |

---

## 2. Category Details & Subcategories

### 2.1 `technical` — Technical & Coding
- **Description:** Hackathons, coding contests, open-source sprints, AI/ML workshops, robotics exhibitions, web3/cloud meetups, and cybersecurity challenges.
- **Subcategories:**
  - `hackathon` — 24h/36h/48h team hackathons and buildathons
  - `coding_contest` — Competitive programming, DSA contests, speed debugging
  - `ai_robotics` — Machine learning workshops, robot wars, IoT exhibitions
  - `tech_workshop` — Hands-on workshops (React, Cloud, DevOps, Rust, Docker)
  - `open_source` — Hacktoberfest, GSOC info sessions, contributor meetups
- **Canonical Tags:** `['hackathon', 'coding', 'ai', 'ml', 'robotics', 'web3', 'dsa', 'cybersecurity', 'cloud', 'workshop']`

---

### 2.2 `cultural` — Cultural & Arts
- **Description:** Music performances, dance competitions, drama/theatre productions, fine arts exhibitions, fashion shows, open mics, and literary debates.
- **Subcategories:**
  - `music` — Band nights, acoustic gigs, classical recitals, DJ sets
  - `dance` — Western group dance, street battle, classical solo
  - `drama_theatre` — Stage plays, street plays (Nukkad Natak), improv drama
  - `fine_arts` — Live painting, digital art exhibitions, sketching workshops
  - `literary_debating` — Parliamentary debate, poetry slams, MUNs, creative writing
  - `fashion` — Campus fashion runway, styling competitions
- **Canonical Tags:** `['music', 'band', 'dance', 'theatre', 'drama', 'art', 'poetry', 'debate', 'fashion', 'open-mic']`

---

### 2.3 `sports` — Sports & Esports
- **Description:** Inter-department and inter-college sports tournaments, athletic meets, friendly matches, fitness challenges, and gaming/esports championships.
- **Subcategories:**
  - `cricket` — Box cricket, departmental league, T20 championship
  - `football` — 5v5 futsal, inter-year football league
  - `basketball` — 3v3 streetball, departmental knockout tournament
  - `esports` — Valorant, BGMI, EA FC / FIFA, Rocket League tourneys
  - `athletics_badminton` — Badminton open, table tennis, 100m sprint, chess
- **Canonical Tags:** `['cricket', 'football', 'basketball', 'badminton', 'esports', 'valorant', 'bgmi', 'chess', 'athletics']`

---

### 2.4 `social` — Social & Campus Life
- **Description:** Fests, freshers welcomes, farewells, cultural nights, campus parties, club recruitment drives, and student networking mixers.
- **Subcategories:**
  - `college_fest` — Annual cultural/technical university festivals
  - `freshers_farewell` — Official freshers welcome parties, senior farewell nights
  - `social_gathering` — Bonfire nights, movie screenings under the stars, mixers
  - `club_orientation` — Club recruitments, inductions, student council elections
- **Canonical Tags:** `['fest', 'freshers', 'farewell', 'party', 'social', 'networking', 'recruitment', 'bonfire']`

---

### 2.5 `career` — Career & Internships
- **Description:** Placement prep sessions, campus drives, internship openings, alumni networking talks, resume reviews, and industry speaker panels.
- **Subcategories:**
  - `placement_talk` — Pre-placement talks by hiring companies, TPC orientation
  - `internship` — Summer internship openings, research fellowships
  - `interview_prep` — Mock coding interviews, resume teardowns, HR Q&A
  - `career_fair` — Campus startup expo, corporate career summits
- **Canonical Tags:** `['placement', 'internships', 'careers', 'interviews', 'resume', 'hiring', 'jobs', 'alumni']`

---

### 2.6 `wellness` — Wellness & Psychology
- **Description:** Mental health counseling workshops, stress management for exams, mindfulness meditation, yoga camps, and health check-ups.
- **Subcategories:**
  - `mental_health` — Group therapy sessions, psychology awareness talks
  - `stress_management` — Exam anxiety relief, time management, sleep hygiene
  - `mindfulness_yoga` — Morning yoga in the quad, guided breathwork
  - `health_camp` — Blood donation, eye check-up, general health drives
- **Canonical Tags:** `['wellness', 'mental-health', 'mindfulness', 'yoga', 'stress-relief', 'psychology', 'health-camp']`

---

### 2.7 `learning_research` — Learning & Research
- **Description:** Faculty and guest lectures, academic seminars, research paper presentations, journal clubs, and cross-disciplinary masterclasses.
- **Subcategories:**
  - `guest_lecture` — Talks by visiting professors, industry veterans, researchers
  - `research_talk` — Paper presentations, patent awareness, lab open houses
  - `academic_workshop` — LaTeX formatting, scientific computing, MATLAB/Python
- **Canonical Tags:** `['lecture', 'research', 'seminar', 'masterclass', 'paper-writing', 'science', 'innovation']`

---

### 2.8 `important_campus` — Important Campus (Institutional)
- **Description:** Official exam notifications, MST schedules, result declarations, circulars from the Dean/Controller of Exams, and campus emergency notices.
- **Subcategories:**
  - `exam_notification` — Mid-semester test (MST) and end-semester datesheets
  - `result_declaration` — Semester grade sheets, revaluation windows
  - `official_notice` — Fee deadlines, holiday declarations, campus weather closures
  - `campus_advisory` — Hostel notices, library timings, transport updates
- **Canonical Tags:** `['official', 'exams', 'mst', 'results', 'datesheet', 'circular', 'dean-office', 'notice']`

---

## 3. Integration Rules for Engineering Tracks

1. **For Nidhi (Frontend):**
   - Use `PRIMARY_CAMPUS_CATEGORIES` for rendering onboarding category pills and Explore tab filters.
   - Display the designated icon alongside category badges on all event cards.
2. **For Jayant (Backend):**
   - Restrict `CampusItem.category` database column to the 8 canonical keys (with string fallback).
   - Ensure `important_campus` items are always returned by `GET /campus-items/important` endpoint.
3. **For Prabhav (AI / Intelligence):**
   - Map extracted poster text to one of the 8 canonical categories.
   - Use canonical tags for keyword and similarity scoring.
