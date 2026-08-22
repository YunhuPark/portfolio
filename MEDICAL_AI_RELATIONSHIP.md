# Medical AI portfolio relationship

## Portfolio hierarchy

The three medical projects are related, but they are not presented as three identical peer-level products.

```text
IMST-Mamba                    Medi-Matrix                     Golden-Time
MODEL RESEARCH       ->       MULTI-MODAL SYSTEM      - - >   ACTION SUPPORT
Related research              Current prototype                Independent app
```

## Current implementation boundary

### IMST-Mamba

- Independent time-series research project
- Focus: missingness modeling, baseline comparison, ablation, subgroup evaluation
- Used by Medi-Matrix as the source of the Vitals prediction idea and an experimental module boundary

### Medi-Matrix

- Current multi-modal system prototype
- Focus: 3D medical imaging, Vitals replay, authentication, private storage, signed URLs, WebSocket, triage flow
- Public deployment uses synthetic data and Demo Inference

### Golden-Time

- Independently implemented emergency-hospital search application
- Focus: bed availability, ETA, disease fit, routing and hospital recommendation
- Automatic handoff from Medi-Matrix is Future Work and is not represented as currently implemented

## Portfolio presentation rule

- Homepage primary case studies: Algo Pipeline, Medi-Matrix, Medical Insight Lab
- Research & additional work: IMST-Mamba, Golden-Time, Mareungil
- Medi-Matrix detail page contains the explicit MODEL -> SYSTEM -> ACTION relationship diagram
- Solid connector means current conceptual or experimental module connection
- Dashed connector means planned integration
