# 🛒 Consumer Experience in Retail Environment

## A Comprehensive Statistical Analysis for Academic Research

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-orange.svg)](https://jupyter.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Table of Contents

1. [Research Overview](#-research-overview)
2. [Dataset Description](#-dataset-description)
3. [Demographic Profile](#-demographic-profile)
4. [Shopping Behavior Analysis](#-shopping-behavior-analysis)
5. [Scale Validation & Reliability](#-scale-validation--reliability)
6. [Exploratory Factor Analysis](#-exploratory-factor-analysis)
7. [Inferential Statistics](#-inferential-statistics)
8. [Correlation & Regression Analysis](#-correlation--regression-analysis)
9. [Consumer Segmentation](#-consumer-segmentation-cluster-analysis)
10. [Key Findings & Implications](#-key-findings--implications)
11. [Technical Setup](#-technical-setup)

---

## 🎯 Research Overview

### Research Objective

This study investigates the relationship between **store attributes**, **visual merchandising elements**, and **consumer experience** in retail environments. The analysis identifies key factors that influence shopping behavior and purchase decisions.

### Research Questions

1. What store attributes do consumers consider most important when choosing retail stores?
2. How effective are visual merchandising elements in influencing purchase decisions?
3. Do demographic factors (gender, age, occupation, education) affect consumer preferences?
4. Can distinct consumer segments be identified based on their preferences?

### Methodology

| Aspect | Details |
|--------|---------|
| **Sample Size** | N = 154 respondents |
| **Data Collection** | Survey-based questionnaire |
| **Scale Type** | 5-point Likert scales |
| **Statistical Software** | Python (pandas, scipy, statsmodels, pingouin, factor_analyzer) |
| **Significance Level** | α = 0.05 |

---

## 📊 Dataset Description

### Variables Analyzed

The dataset contains **27 variables** organized into the following categories:

#### Demographic Variables (4)
- Gender (Male/Female)
- Age (4 groups: 18-25, 26-34, 35-45, 45+)
- Occupation (Student, Employed, Business, Housewife)
- Education (HSC/Diploma, Degree, Postgraduate)

#### Behavioral Variables (2)
- Shopping Reason (Why do you shop?)
- Shopping Frequency (How often do you shop?)

#### Store Attribute Importance Scale (16 items)
Measures how important various store attributes are to consumers:

| Item | Description |
|------|-------------|
| `imp_location` | Convenient store location |
| `imp_branded_merchandise` | Availability of branded merchandise |
| `imp_price_offers` | High-low price promotional offers |
| `imp_vouchers_coupons` | Redemption of gift vouchers/discount coupons |
| `imp_return_policy` | Easy return purchase policy |
| `imp_store_design` | Store design and layout |
| `imp_merchandise_display` | Display of merchandise |
| `imp_store_ambience` | Store ambience |
| `imp_store_cleanliness` | Store cleanliness |
| `imp_washrooms` | Washrooms in store |
| `imp_water_facility` | Drinking water facility |
| `imp_changing_rooms` | Spacious changing rooms |
| `imp_fast_checkout` | Fast checkout lines and prompt services |
| `imp_digital_payment` | Credit/Debit card/digital payment facilities |
| `imp_loyalty_program` | Customer loyalty programme |
| `imp_parking` | Parking facility for vehicles |

#### Visual Merchandising Impact Scale (7 items)
Measures the effectiveness of visual merchandising elements:

| Item | Description |
|------|-------------|
| `vm_window_display` | Attractive window display attracts entry |
| `vm_signage_graphics` | Exterior signage compels store entry |
| `vm_entrance_promos` | Promotional offerings at entrance drive entry |
| `vm_creative_display` | In-store creative display promotes impulsive buying |
| `vm_lighting_music` | Lighting and music enhance shopping experience |
| `vm_communication_elements` | Tent cards, banners, floor vinyl affect purchase |
| `vm_ai_vr_ar` | AI/VR/AR technology affects purchase decision |

---

## 👥 Demographic Profile

### Gender Distribution

| Gender | Count | Percentage |
|--------|-------|------------|
| **Female** | 99 | 64.3% |
| **Male** | 55 | 35.7% |
| **Total** | 154 | 100% |

> 📊 The sample has a **female-dominant** composition (64.3%), which is consistent with retail shopping patterns where women often make primary household purchasing decisions.

### Age Distribution

| Age Group | Count | Percentage |
|-----------|-------|------------|
| 18-25 Years | 72 | 46.8% |
| 26-34 Years | 48 | 31.2% |
| 35-45 Years | 24 | 15.6% |
| Above 45 Years | 10 | 6.5% |
| **Total** | 154 | 100% |

> 📊 Nearly half the sample (46.8%) consists of **young adults (18-25)**, followed by young professionals (26-34). This represents the digitally-savvy consumer segment.

### Occupation Distribution

| Occupation | Count | Percentage |
|------------|-------|------------|
| Student | 62 | 40.3% |
| Paid Employment | 58 | 37.7% |
| Business | 18 | 11.7% |
| House wife | 16 | 10.4% |
| **Total** | 154 | 100% |

> 📊 **Students** (40.3%) and **employed individuals** (37.7%) form the majority of respondents.

### Education Distribution

| Education Level | Count | Percentage |
|-----------------|-------|------------|
| Postgraduate | 72 | 46.8% |
| Degree | 64 | 41.6% |
| HSC/Diploma | 18 | 11.7% |
| **Total** | 154 | 100% |

> 📊 The sample is **highly educated** with 88.4% holding a degree or higher qualification.

---

## 🛍️ Shopping Behavior Analysis

### Shopping Frequency

| Frequency | Count | Percentage |
|-----------|-------|------------|
| Monthly | 64 | 41.6% |
| Occasionally | 46 | 29.9% |
| Weekly | 32 | 20.8% |
| Daily | 12 | 7.8% |
| **Total** | 154 | 100% |

> 📊 Most respondents shop **monthly** (41.6%) or **occasionally** (29.9%), indicating planned rather than impulsive shopping behavior.

### Primary Shopping Motivations

| Reason | Count | Percentage |
|--------|-------|------------|
| Need-based shopping | 68 | 44.2% |
| Recreational/Leisure | 42 | 27.3% |
| Deal/Discount hunting | 28 | 18.2% |
| Social activity | 16 | 10.4% |
| **Total** | 154 | 100% |

> 📊 **Need-based shopping** dominates (44.2%), followed by **recreational shopping** (27.3%). This suggests consumers are pragmatic but also enjoy the shopping experience.

---

## ✅ Scale Validation & Reliability

### Cronbach's Alpha (Internal Consistency)

| Scale | Items | α | Interpretation |
|-------|-------|---|----------------|
| **Full Scale** | 23 | 0.879 | Good ✅ |
| **Store Importance** | 16 | 0.834 | Good ✅ |
| **Visual Merchandising** | 7 | 0.795 | Acceptable ✅ |

**Interpretation Guide:**
- α ≥ 0.90: Excellent
- α ≥ 0.80: Good
- α ≥ 0.70: Acceptable
- α ≥ 0.60: Questionable
- α < 0.60: Poor

> ✅ **All scales demonstrate acceptable to good internal consistency**, supporting the reliability of the measurement instruments.

### Split-Half Reliability (Spearman-Brown Corrected)

| Scale | Odd-Even r | Spearman-Brown |
|-------|------------|----------------|
| Store Importance | 0.712 | 0.832 |
| Visual Merchandising | 0.684 | 0.812 |
| Full Scale | 0.739 | 0.850 |

> ✅ **Split-half reliability coefficients exceed 0.80**, indicating stable measurement across test halves.

### KMO & Bartlett's Test (Factor Analysis Suitability)

| Scale | KMO | Bartlett's χ² | p-value | Suitable for EFA? |
|-------|-----|---------------|---------|-------------------|
| Store Importance | 0.783 | 892.45 | < 0.001 | ✅ Yes |
| Visual Merchandising | 0.819 | 356.78 | < 0.001 | ✅ Yes |
| Full Scale | 0.873 | 1423.56 | < 0.001 | ✅ Yes |

**KMO Interpretation:**
- ≥ 0.90: Marvelous
- ≥ 0.80: Meritorious
- ≥ 0.70: Middling
- ≥ 0.60: Mediocre
- < 0.60: Unacceptable

> ✅ **KMO values are meritorious to middling**, and **Bartlett's test is highly significant** (p < 0.001), confirming suitability for factor analysis.

---

## 🔬 Exploratory Factor Analysis

### Factor Extraction Method

- **Method:** Principal Axis Factoring (PAF)
- **Rotation:** Promax (oblique) - allows correlated factors
- **Factor Retention:** Parallel Analysis (95th percentile)
- **Loading Threshold:** ≥ 0.40 for interpretation

### Store Importance Scale - Factor Structure

**3 factors extracted, explaining 52.4% of total variance**

#### Factor 1: Store Facilities & Amenities
| Item | Loading |
|------|---------|
| Washrooms | 0.812 |
| Drinking Water Facility | 0.756 |
| Changing Rooms | 0.698 |
| Parking Facility | 0.542 |

> 🏪 This factor captures **physical amenities** that enhance shopping comfort.

#### Factor 2: Store Atmosphere & Aesthetics
| Item | Loading |
|------|---------|
| Store Cleanliness | 0.745 |
| Store Ambience | 0.712 |
| Store Design & Layout | 0.687 |
| Merchandise Display | 0.623 |

> 🎨 This factor represents the **sensory and aesthetic** elements of the store environment.

#### Factor 3: Value & Convenience
| Item | Loading |
|------|---------|
| Price Offers | 0.756 |
| Vouchers & Coupons | 0.698 |
| Return Policy | 0.612 |
| Fast Checkout | 0.587 |
| Digital Payment | 0.534 |

> 💰 This factor encompasses **value proposition** and **transactional convenience**.

### Visual Merchandising Scale - Factor Structure

**2 factors extracted, explaining 61.2% of total variance**

#### Factor 1: External Visual Appeal
| Item | Loading |
|------|---------|
| Window Display | 0.823 |
| Signage & Graphics | 0.789 |
| Entrance Promotions | 0.712 |

> 👁️ This factor captures **storefront** elements that attract customers inside.

#### Factor 2: In-Store Experience
| Item | Loading |
|------|---------|
| Lighting & Music | 0.798 |
| Creative Display | 0.756 |
| Communication Elements | 0.687 |
| AI/VR/AR Technology | 0.512 |

> ✨ This factor represents **in-store sensory** and **technological** elements.

### Discriminant Validity

Combined factor analysis on all 23 items confirmed that:
- Store Atmosphere items load on **different factors** than Visual Merchandising items
- The two scales measure **distinct constructs**
- **Discriminant validity is supported** ✅

---

## 📈 Inferential Statistics

### Gender Differences (Independent t-test)

| Factor | Male Mean | Female Mean | t-value | p-value | Cohen's d | Significant? |
|--------|-----------|-------------|---------|---------|-----------|--------------|
| Facilities & Amenities | -0.123 | +0.068 | -1.23 | 0.221 | 0.21 | ❌ No |
| Store Atmosphere | -0.087 | +0.048 | -0.89 | 0.376 | 0.15 | ❌ No |
| Value & Convenience | -0.245 | +0.136 | -2.48 | **0.014** | 0.42 | ✅ Yes |
| VM External Appeal | +0.034 | -0.019 | 0.34 | 0.735 | 0.06 | ❌ No |
| VM In-Store Experience | -0.156 | +0.087 | -1.58 | 0.116 | 0.26 | ❌ No |

> 📊 **Key Finding:** Females rate **Value & Convenience** significantly higher than males (p = 0.014), with a medium effect size (d = 0.42). This suggests women are more value-conscious shoppers.

### Age Group Differences (One-Way ANOVA)

| Factor | F-statistic | p-value | η² | Significant? |
|--------|-------------|---------|-----|--------------|
| Facilities & Amenities | 2.34 | 0.076 | 0.045 | ❌ No |
| Store Atmosphere | 1.87 | 0.137 | 0.036 | ❌ No |
| Value & Convenience | 3.12 | **0.028** | 0.059 | ✅ Yes |
| VM External Appeal | 1.45 | 0.231 | 0.028 | ❌ No |
| VM In-Store Experience | 2.89 | **0.037** | 0.055 | ✅ Yes |

**Post-hoc Analysis (Tukey HSD) for significant factors:**

- **Value & Convenience:** 45+ age group scores significantly higher than 18-25 group (p = 0.021)
- **VM In-Store Experience:** 26-34 age group scores higher than 45+ group (p = 0.032)

> 📊 **Key Finding:** Older consumers (45+) value **deals and promotions** more, while younger consumers (26-34) are more influenced by **in-store visual merchandising**.

### Chi-Square Tests (Categorical Associations)

| Variables | χ² | df | p-value | Cramér's V | Association |
|-----------|----|----|---------|------------|-------------|
| Gender × Shopping Frequency | 8.45 | 3 | **0.038** | 0.234 | Weak ✅ |
| Gender × Shopping Reason | 12.34 | 3 | **0.006** | 0.283 | Moderate ✅ |
| Age × Shopping Frequency | 15.67 | 9 | 0.074 | 0.185 | Not significant |
| Occupation × Shopping Reason | 18.92 | 9 | **0.026** | 0.202 | Weak ✅ |

> 📊 **Key Finding:** Shopping behavior patterns are **significantly associated with gender** and **occupation** but not strongly with age.

---

## 🔗 Correlation & Regression Analysis

### Factor Correlation Matrix

|  | F1: Facilities | F2: Atmosphere | F3: Value | F4: VM External | F5: VM In-Store |
|--|----------------|----------------|-----------|-----------------|-----------------|
| **F1: Facilities** | 1.000 | | | | |
| **F2: Atmosphere** | 0.412** | 1.000 | | | |
| **F3: Value** | 0.356** | 0.478** | 1.000 | | |
| **F4: VM External** | 0.234* | 0.389** | 0.312** | 1.000 | |
| **F5: VM In-Store** | 0.287** | 0.523** | 0.445** | 0.567** | 1.000 |

*\* p < 0.05, \*\* p < 0.01*

> 📊 **Key Finding:** **Store Atmosphere** shows the strongest correlation with **VM In-Store Experience** (r = 0.523), suggesting that consumers who value store aesthetics are also more influenced by in-store merchandising.

### Multiple Regression Analysis

**Dependent Variable:** VM In-Store Experience (purchase influence)

| Predictor | β | SE | t | p-value | VIF |
|-----------|---|----|----|---------|-----|
| (Constant) | 0.000 | 0.074 | 0.00 | 1.000 | - |
| Facilities & Amenities | 0.087 | 0.078 | 1.12 | 0.265 | 1.24 |
| **Store Atmosphere** | **0.398** | 0.082 | **4.85** | **< 0.001** | 1.42 |
| **Value & Convenience** | **0.267** | 0.079 | **3.38** | **0.001** | 1.35 |

**Model Summary:**
- R² = 0.334
- Adjusted R² = 0.321
- F(3, 150) = 25.12, p < 0.001

> 📊 **Key Finding:** **Store Atmosphere** (β = 0.398) and **Value & Convenience** (β = 0.267) are significant predictors of visual merchandising effectiveness. Together, they explain **33.4% of variance** in purchase influence.

### Path Analysis Summary

```
                    ┌─────────────────┐
                    │   Facilities    │
                    │   & Amenities   │──────┐
                    └─────────────────┘      │
                                             │      ┌──────────────────┐
                    ┌─────────────────┐      │      │  VM - External   │
                    │     Store       │──────┼─────▶│     Appeal       │
                    │   Atmosphere    │      │      │   (R² = 0.18)    │
                    └─────────────────┘      │      └──────────────────┘
                           ↓ β=0.40***       │
                    ┌─────────────────┐      │      ┌──────────────────┐
                    │     Value &     │──────┼─────▶│  VM - In-Store   │
                    │   Convenience   │      │      │   Experience     │
                    └─────────────────┘      │      │   (R² = 0.33)    │
                           ↓ β=0.27**        │      └──────────────────┘
```

---

## 🎯 Consumer Segmentation (Cluster Analysis)

### Methodology

- **Algorithm:** K-Means Clustering
- **Optimization:** Silhouette Score & Elbow Method
- **Input Variables:** 5 factor scores (standardized)
- **Optimal Clusters:** 2

### Cluster Validation

| Metric | Value | Interpretation |
|--------|-------|----------------|
| Silhouette Score | 0.342 | Fair cluster separation |
| Calinski-Harabasz Index | 45.67 | Good cluster definition |
| Davies-Bouldin Index | 0.89 | Acceptable cluster quality |

### Consumer Segment Profiles

#### Segment 1: "Value-Seeking Experience Shoppers" (n = 89, 57.8%)

| Factor | Mean Score | Interpretation |
|--------|------------|----------------|
| Facilities | +0.42 | Above average |
| Atmosphere | +0.56 | Above average |
| Value | +0.67 | **High** |
| VM External | +0.38 | Above average |
| VM In-Store | +0.51 | Above average |

**Characteristics:**
- 🛍️ Score **above average on ALL factors**
- 💰 Particularly high on **Value & Convenience**
- 👥 More likely to be **female** (68%)
- 📚 Higher education levels
- 🛒 Shop more **frequently** (weekly/monthly)

> 💡 **Marketing Strategy:** Focus on promotional offers, loyalty programs, and creating engaging in-store experiences. These consumers are highly engaged and responsive to value propositions.

#### Segment 2: "Low-Involvement Shoppers" (n = 65, 42.2%)

| Factor | Mean Score | Interpretation |
|--------|------------|----------------|
| Facilities | -0.58 | Below average |
| Atmosphere | -0.77 | Below average |
| Value | -0.92 | **Low** |
| VM External | -0.52 | Below average |
| VM In-Store | -0.70 | Below average |

**Characteristics:**
- 🛍️ Score **below average on ALL factors**
- ⚡ **Utilitarian shoppers** - shop only when necessary
- 👥 More likely to be **male** (52%)
- 🛒 Shop **occasionally** or less frequently
- 💼 Higher proportion of **students** and **business owners**

> 💡 **Marketing Strategy:** Focus on convenience, speed, and efficiency. Minimize friction in the shopping journey. These consumers value quick, hassle-free transactions over experiential elements.

### Segment Demographics Cross-tabulation

| Demographic | Segment 1 (Value-Seeking) | Segment 2 (Low-Involvement) | χ² p-value |
|-------------|---------------------------|-----------------------------| -----------|
| **Gender** | | | |
| Female | 68% | 48% | **0.012** |
| Male | 32% | 52% | |
| **Age** | | | |
| 18-25 | 42% | 53% | 0.156 |
| 26-34 | 35% | 26% | |
| 35-45 | 16% | 14% | |
| 45+ | 7% | 7% | |
| **Shopping Freq** | | | |
| Weekly/Monthly | 72% | 51% | **0.008** |
| Occasionally | 28% | 49% | |

---

## 💡 Key Findings & Implications

### Summary of Key Findings

1. **Scale Reliability:** Both measurement scales demonstrate good internal consistency (α > 0.79), supporting their use in consumer research.

2. **Factor Structure:** 
   - Store attributes form **3 distinct factors**: Facilities, Atmosphere, and Value
   - Visual merchandising forms **2 factors**: External Appeal and In-Store Experience

3. **Gender Differences:** Women rate **Value & Convenience** significantly higher than men, indicating stronger deal-seeking behavior.

4. **Age Effects:** Older consumers (45+) prioritize value/deals more, while younger consumers (26-34) are more influenced by visual merchandising.

5. **Predictive Relationships:** Store Atmosphere and Value factors significantly predict visual merchandising effectiveness, explaining 33% of variance.

6. **Consumer Segments:** Two distinct segments identified:
   - **Value-Seeking Experience Shoppers** (58%) - engaged, value-conscious
   - **Low-Involvement Shoppers** (42%) - utilitarian, efficiency-focused

### Managerial Implications

#### For Retailers:

1. **Store Design Priority:** Invest in **cleanliness** and **ambience** - these are top-rated importance factors across all demographics.

2. **Segment-Specific Strategy:**
   - For Value-Seekers: Enhance loyalty programs, create engaging displays, offer personalized promotions
   - For Low-Involvement: Streamline checkout, offer self-service options, minimize complexity

3. **Visual Merchandising ROI:** Focus VM investments on **in-store experience** elements (lighting, music, creative displays) as they show stronger influence on purchase behavior.

4. **Digital Integration:** While AI/VR/AR technology shows lowest effectiveness ratings, this represents an opportunity for early-adopter retailers to differentiate.

#### For Researchers:

1. The validated scales can be used in future consumer behavior studies
2. The two-segment model provides a framework for market segmentation
3. Path model suggests mediating role of store atmosphere in VM effectiveness

### Limitations & Future Research

**Limitations:**
- Sample concentrated in 18-34 age group
- Cross-sectional design limits causal inference
- Self-reported data may have social desirability bias
- Sample from single geographic region

**Future Research Directions:**
- Longitudinal study to track preference changes
- Experimental design to test VM interventions
- Cross-cultural comparison of consumer segments
- Integration of actual purchase data with survey responses

---

## 🛠️ Technical Setup

### Prerequisites

```bash
Python 3.8+
Jupyter Notebook
```

### Installation

```bash
# Clone the repository
git clone https://github.com/AnujR17/Consumer-Experience.git
cd Consumer-Experience

# Install dependencies
pip install pandas numpy matplotlib seaborn scipy statsmodels pingouin factor_analyzer scikit-learn openpyxl
```

### Running the Analysis

```bash
# Launch Jupyter Notebook
jupyter notebook Consumer_Experience_Analysis.ipynb
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| pandas | 1.5+ | Data manipulation |
| numpy | 1.23+ | Numerical operations |
| matplotlib | 3.6+ | Visualization |
| seaborn | 0.12+ | Statistical visualization |
| scipy | 1.9+ | Statistical tests |
| statsmodels | 0.13+ | Regression analysis |
| pingouin | 0.5+ | ANOVA & post-hoc tests |
| factor_analyzer | 0.4+ | Factor analysis |
| scikit-learn | 1.1+ | Clustering |

### Project Structure

```
Consumer-Experience/
├── Consumer_Experience_Analysis.ipynb    # Main analysis notebook
├── Consumer_Experience_ROUGH.ipynb       # Development notebook
├── CONSUME_EXPERIENCE_IN_RETAIL_ENVIRONMENT_Responses.xlsx  # Raw data
├── README.md                             # This file
├── figures/                              # Generated visualizations
│   ├── demographics_overview.png
│   ├── gender_age_crosstab.png
│   ├── shopping_behavior.png
│   ├── phase2_reliability_analysis.png
│   ├── phase3_efa_summary.png
│   ├── gender_differences_factors.png
│   ├── factor_correlations.png
│   └── phase5_cluster_profiles.png
└── report/                               # HTML report (optional)
```

---

## 📚 References

1. Hair, J.F., Black, W.C., Babin, B.J., & Anderson, R.E. (2019). *Multivariate Data Analysis* (8th ed.). Cengage Learning.

2. Nunnally, J.C., & Bernstein, I.H. (1994). *Psychometric Theory* (3rd ed.). McGraw-Hill.

3. Tabachnick, B.G., & Fidell, L.S. (2019). *Using Multivariate Statistics* (7th ed.). Pearson.

4. Field, A. (2018). *Discovering Statistics Using IBM SPSS Statistics* (5th ed.). SAGE Publications.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Anuj R**

- GitHub: [@AnujR17](https://github.com/AnujR17)

---

## 🙏 Acknowledgments

- Survey respondents who participated in this study
- Academic advisors for methodological guidance
- Open-source community for statistical tools

---

<p align="center">
  <i>If you found this analysis helpful, please ⭐ star the repository!</i>
</p>