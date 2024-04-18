function isNumber(value) {
    return typeof value === 'number' && isFinite(value)
}

export const velocityGuidedGain = (velocity) => {
    if (!isNumber(velocity)) return 0
    if (velocity <= 26.7) return 2.95

    if (26.7 < velocity && velocity <= 41.1) {
        return 2.55 + ((41.1 - velocity) / (41.1 - 26.7)) * (2.95 - 2.55)
    }

    if (41.1 < velocity && velocity < 62.2) {
        return 2.22 + ((62.2 - velocity) / (62.2 - 41.1)) * (2.55 - 2.22)
    }

    if (velocity >= 62.2) return 2.22
}

export const physicalAngleStepBasedGain = (angle, steps) => {
    if (!isNumber(angle)) return 0

    if (angle <= 10) return steps[0] //1.8

    if (10 < angle && angle <= 20) {
        return steps[1] //2.2
    }

    if (20 < angle && angle <= 30) {
        return steps[2] // 2.5
    }

    if (30 < angle && angle <= 45) {
        return steps[3] //2.8
    }

    if (45 < angle && angle <= 50) {
        return steps[4] //2.5
    }

    if (50 < angle && angle <= 62.2) {
        return steps[5] //2
    }

    if (angle > 62.2) return steps[6] //1.8
}

export const virtualAngleStepBasedGain = (angle, steps) => {
    if (!isNumber(angle)) return 0

    if (angle <= 26) return steps[0] //1.8

    if (26 < angle && angle <= 41) {
        return steps[1] //2.2
    }

    if (41 < angle && angle <= 71) {
        return steps[2] // 2.5
    }

    if (71 < angle && angle <= 101) {
        return steps[3] //2.8
    }

    if (101 < angle && angle <= 131) {
        return steps[4] //2.5
    }

    if (131 < angle && angle <= 161) {
        return steps[5] //2
    }

    if (angle > 161) return steps[6] //1.8
}

export const dynamicNonLinearGain = (virtualRotationAngle, minGain, maxGain, halfRotation) => {
    return (
        minGain * Math.abs((virtualRotationAngle - halfRotation) / halfRotation) +
        maxGain * (1 - Math.abs((virtualRotationAngle - halfRotation) / halfRotation))
    )
}
