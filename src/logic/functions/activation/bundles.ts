import { bent_identity_bundle } from './bent_identity'
import { exponential_linear_unit_bundle } from './elu'
import { hyperbolic_tangent_bundle } from './hyperbolic'
import { leaky_rectified_linear_unit_bundle } from './leaky_rlu'
import { rectified_linear_unit_bundle } from './rlu'
import { sigmoid_bundle } from './sigmoid'
import { swish_bundle } from './swish'

export type bundle_types = "bent_identity" | "exponential_linear_unit" | "hyperbolic_tangent" | "leaky_rectified_linear_unit" | "rectified_linear_unit" | "sigmoid" | "swish"

export const bundles = {
    bent_identity: bent_identity_bundle,
    exponential_linear_unit: exponential_linear_unit_bundle,
    hyperbolic_tangent: hyperbolic_tangent_bundle,
    leaky_rectified_linear_unit: leaky_rectified_linear_unit_bundle,
    rectified_linear_unit: rectified_linear_unit_bundle,
    sigmoid: sigmoid_bundle,
    swish: swish_bundle,
}