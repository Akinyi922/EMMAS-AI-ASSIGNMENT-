Style Assistant — Project Documentation
=====================================

Overview
--------
The Aura web application is an e-commerce prototype that curates and sells garments and accessories. This project augments the shopping experience with a compact "Style Assistant": a lightweight AI-driven feature that recommends coordinated outfits (garments + accessories) optimized for a user's budget and preferred style. The assistant addresses a real-world problem students and consumers face: choosing complementary pieces quickly and confidently from a large assortment.

Problem Statement
-----------------
Many shoppers — particularly those with limited time or modest styling experience — experience decision fatigue when assembling outfits. They must consider style compatibility, price constraints, and practical fit across multiple product categories (e.g., apparel and accessories). For a school project, demonstrating an intelligent feature that reduces cognitive load and accelerates selection both showcases practical engineering and addresses a palpable user need.

Solution Summary
----------------
The Style Assistant generates ranked outfit combinations that respect a user-specified budget and style preference (Formal, Casual, Sporty, or Any). It evaluates item compatibility using lightweight semantic cues extracted from product names and descriptions and balances two objectives: stylistic coherence and cost-efficiency. The highest-ranked combinations are presented as complete "looks" the user can add to cart in one action.

How It Works — Technical Overview
---------------------------------
- Data: The assistant uses the existing product catalog within the application; no external services are required. Each product includes metadata (id, name, category, type, price, images, description, sizes).
- Style tagging: A compact heuristic analyzer derives style tags from product names and descriptions using keyword matching. This approach is deterministic, explainable, and easy to extend for the assignment context.
- Combination generation: For each apparel item, the assistant enumerates small accessory combinations (configurable limit) and filters out outfits that exceed the user's budget.
- Scoring: Combinations are scored by a weighted heuristic that mixes style-match proportion and relative price utilization to favor looks that are both on-style and within budget.
- Integration: The UI component exposes controls for budget, style, and accessory limit. Recommended looks render product cards and include an "Add Look to Cart" action that programmatically adds each item to the existing shopping cart.

Use of AI
---------
The assistant employs a basic AI-inspired approach: lightweight natural-language heuristics to infer style signals from text and a simple ranking model that weights style alignment and price. This design was chosen to satisfy three constraints for a school assignment: reproducibility, minimal external dependencies, and interpretability. The implementation serves as an accessible demonstration of applied AI concepts (feature extraction, scoring, ranking) and can be upgraded to a learned model (e.g., embedding-based similarity or a trained recommender) in later iterations.

User Benefits
-------------
- Saves time by delivering ready-made outfit combinations.
- Reduces uncertainty by explicitly showing style-aligned accessory choices.
- Respects budget constraints so recommendations are actionable.
- Integrates seamlessly with the cart for immediate checkout flow.

Limitations & Future Work
-------------------------
Current heuristics rely on keyword matching and small combinatorics; this keeps behavior predictable but limits nuance. Future improvements for a stronger AI demonstration include:
- Adding manual style tags to the product dataset for higher accuracy.
- Using embeddings or supervised learning to learn style similarity from data.
- Personalization using user history or preference profiles.
- UX polish: mobile visibility, saved looks, and share/export features.

Conclusion
----------
The Style Assistant is a focused, practical enhancement that demonstrates how simple AI techniques can be used to solve a common decision-making problem in online retail. For a school assignment, it provides a clear narrative: identify a user pain point, implement an interpretable AI-enabled solution, and integrate it into a usable web app with tangible benefits for end users.
