function toggleClass(e, cn) {
    if (e.target.className.indexOf(cn) !== -1) {
        e.target.classList.remove(cn);
    } else {
        e.target.classList.add(cn);
    }
}

function clamp(num, min, max) {
    let retVal = Math.min(num, max);
    return Math.max(retVal, min)
}

function simplifyRotation(rotDeg) {
    while (rotDeg > 360) {
        rotDeg -= 360;
    }
    while (rotDeg < 0) {
        rotDeg += 360;
    }

    return rotDeg;
}
