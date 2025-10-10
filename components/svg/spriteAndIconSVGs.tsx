

interface IconSpriteSVGsProp {
    className?: string;
    width?: number;
    height?: number;
}


function Credentials({className, width = 24, height = 24,}: IconSpriteSVGsProp) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href="/icons/sprite.svg#credentials" />
        </svg>
    )
}

function FileUpload({className, width = 24, height = 24,}: IconSpriteSVGsProp) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href="/icons/sprite.svg#file-upload" />
        </svg>
    )
}

function MagnifyGlass({className, width = 24, height = 24,}: IconSpriteSVGsProp) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href="/icons/sprite.svg#magnify-glass" />
        </svg>
    )
}

function CreateAccount({className, width = 24, height = 24,}: IconSpriteSVGsProp) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href="/icons/sprite.svg#create-account" />
        </svg>
    )
}


function MOHSLogoBlackBG({className, width = 24, height = 24,}: IconSpriteSVGsProp) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href="/icons/sprite.svg#mohs-logo-black-bg" />
        </svg>
    )
}


function MOHSLogoWhiteBG({className, width = 24, height = 24,}: IconSpriteSVGsProp) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href="/icons/sprite.svg#mohs-logo-white-bg" />
        </svg>
    )
}


function PadLock({className, width = 24, height = 24,}: IconSpriteSVGsProp) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href="/icons/sprite.svg#pad-lock" />
        </svg>
    )
}


function PieChart({className, width = 24, height = 24,}: IconSpriteSVGsProp) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href="/icons/sprite.svg#pie-chart" />
        </svg>
    )
}


function Timeline({className, width = 24, height = 24,}: IconSpriteSVGsProp) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href="/icons/sprite.svg#timeline" />
        </svg>
    )
}


function Verified({className, width = 24, height = 24,}: IconSpriteSVGsProp) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href="/icons/sprite.svg#verified" />
        </svg>
    )
}

export {
    Credentials,
    FileUpload,
    MagnifyGlass,
    CreateAccount,
    MOHSLogoBlackBG,
    MOHSLogoWhiteBG,
    PadLock,
    PieChart,
    Timeline,
    Verified
}