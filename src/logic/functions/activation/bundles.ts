import BentIdentityBundle from './bent_identity'
import ExponentialLinearUnitBundle from './elu'
import HyperbolicTangentBundle from './hyperbolic'
import LeakyRectifiedLinearUnitBundle from './leaky_rlu'
import RectifiedLinearUnitBundle from './rlu'
import SigmoidBundle from './sigmoid'
import SwishBundle from './swish'

export type bundle_types = "bent_identity" | "exponential_linear_unit" | "hyperbolic_tangent" | "leaky_rectified_linear_unit" | "rectified_linear_unit" | "sigmoid" | "swish"

export const bundles = {
    bent_identity: BentIdentityBundle,
    exponential_linear_unit: ExponentialLinearUnitBundle,
    hyperbolic_tangent: HyperbolicTangentBundle,
    leaky_rectified_linear_unit: LeakyRectifiedLinearUnitBundle,
    rectified_linear_unit: RectifiedLinearUnitBundle,
    sigmoid: SigmoidBundle,
    swish: SwishBundle,
}