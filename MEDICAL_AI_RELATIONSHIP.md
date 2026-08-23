# Medical AI portfolio relationship

## Portfolio hierarchy

The three medical projects are related, but they are not presented as three identical peer-level products.

```text
IMST-Mamba                    Medi-Matrix                     Golden-Time
MODEL RESEARCH       ->       MULTI-MODAL SYSTEM      ->      ACTION SUPPORT
Related research              Current prototype                Independent product
```

## Current implementation boundary

### IMST-Mamba

- Independent time-series research project
- Focus: missingness modeling, baseline comparison, ablation, subgroup evaluation
- Used by Medi-Matrix as the source of the Vitals prediction idea and an experimental module boundary

### Medi-Matrix

- Current multi-modal system prototype
- Focus: 3D medical imaging, Vitals replay, authentication, private storage, signed URLs, WebSocket and triage flow
- Public deployment uses synthetic data and Demo Inference
- Implements a browser-side handoff to Golden-Time using a minimal synthetic-demo context

### Golden-Time

- Independently implemented emergency-hospital search application
- Focus: bed availability, ETA, disease fit, routing and hospital recommendation
- Parses the Medi-Matrix handoff context and applies it to AI context / recommendation filtering

## Implemented handoff

Medi-Matrix currently builds an HTTPS Golden-Time URL containing only the information needed for the demo recommendation context, such as triage, modality-derived condition, lesion volume, capabilities and specialties.

The handoff intentionally excludes sensitive values such as JWT/access tokens, patientId, meshId and signed storage URLs. Golden-Time parses the query parameters and uses them as recommendation context. This is an implemented browser redirect/context handoff, not a server-to-server clinical referral workflow and not a clinically validated integrated system.

## Portfolio presentation rule

- Homepage primary case studies: Algo Pipeline, Medi-Matrix, Medical Insight Lab
- Research & additional work: IMST-Mamba, Golden-Time, Mareungil
- Medi-Matrix detail page contains the explicit MODEL -> SYSTEM -> ACTION relationship diagram
- IMST-Mamba -> Medi-Matrix: related research / experimental module boundary
- Medi-Matrix -> Golden-Time: implemented synthetic-demo context handoff
- Never describe the public demo as clinical diagnosis or an automated medical referral system
