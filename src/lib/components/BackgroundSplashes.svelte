<div class="splashes-container">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>
    <div class="blob blob-5"></div>
    <div class="blob blob-6"></div>
    <div class="blob blob-7"></div>
    <div class="blob blob-yellow-1"></div>
    <div class="blob blob-yellow-2"></div>
</div>

<style>
    .splashes-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        overflow: hidden;
        pointer-events: none;
    }

    .blob {
        position: absolute;
        border-radius: 50%;
    }

    /* Teal/Cyan splashes with extended smooth fading */
    .blob-1 {
        top: -10%;
        left: -10%;
        width: 60vw;
        height: 60vw;
        animation: float 20s infinite alternate;
        background: radial-gradient(
            circle at 30% 30%,
            rgba(65, 220, 204, 0.7) 0%,
            rgba(65, 220, 204, 0.35) 30%,
            rgba(65, 220, 204, 0.15) 50%,
            rgba(65, 220, 204, 0.05) 70%,
            rgba(65, 220, 204, 0.01) 85%,
            transparent 100%
        );
    }

    .blob-2 {
        bottom: -20%;
        right: -10%;
        width: 70vw;
        height: 70vw;
        animation: float 25s infinite alternate-reverse;
        background: radial-gradient(
            circle at 70% 70%,
            rgba(89, 211, 255, 0.6) 0%,
            rgba(89, 211, 255, 0.3) 30%,
            rgba(89, 211, 255, 0.12) 50%,
            rgba(89, 211, 255, 0.04) 70%,
            rgba(89, 211, 255, 0.01) 85%,
            transparent 100%
        );
    }

    .blob-3 {
        top: 30%;
        left: 50%;
        width: 40vw;
        height: 40vw;
        animation: float 18s infinite alternate;
        background: radial-gradient(
            circle at center,
            rgba(65, 220, 204, 0.5) 0%,
            rgba(65, 220, 204, 0.25) 30%,
            rgba(65, 220, 204, 0.1) 50%,
            rgba(65, 220, 204, 0.03) 70%,
            rgba(65, 220, 204, 0.01) 85%,
            transparent 100%
        );
    }

    .blob-4 {
        bottom: 10%;
        left: 0%;
        width: 35vw;
        height: 35vw;
        animation: float 22s infinite alternate-reverse;
        background: radial-gradient(
            circle at center,
            rgba(89, 211, 255, 0.5) 0%,
            rgba(89, 211, 255, 0.25) 30%,
            rgba(89, 211, 255, 0.1) 50%,
            rgba(89, 211, 255, 0.03) 70%,
            rgba(89, 211, 255, 0.01) 85%,
            transparent 100%
        );
    }

    .blob-5 {
        top: 60%;
        right: 20%;
        width: 30vw;
        height: 30vw;
        animation: float 24s infinite alternate;
        background: radial-gradient(
            circle at center,
            rgba(65, 220, 204, 0.4) 0%,
            rgba(65, 220, 204, 0.2) 30%,
            rgba(65, 220, 204, 0.08) 50%,
            rgba(65, 220, 204, 0.02) 70%,
            rgba(65, 220, 204, 0.005) 85%,
            transparent 100%
        );
    }

    .blob-6 {
        top: 10%;
        right: 30%;
        width: 45vw;
        height: 45vw;
        animation: float 28s infinite alternate-reverse;
        background: radial-gradient(
            circle at center,
            rgba(89, 211, 255, 0.45) 0%,
            rgba(89, 211, 255, 0.22) 30%,
            rgba(89, 211, 255, 0.09) 50%,
            rgba(89, 211, 255, 0.03) 70%,
            rgba(89, 211, 255, 0.008) 85%,
            transparent 100%
        );
    }

    .blob-7 {
        bottom: 40%;
        left: 25%;
        width: 38vw;
        height: 38vw;
        animation: float 21s infinite alternate;
        background: radial-gradient(
            circle at center,
            rgba(65, 220, 204, 0.42) 0%,
            rgba(65, 220, 204, 0.21) 30%,
            rgba(65, 220, 204, 0.08) 50%,
            rgba(65, 220, 204, 0.025) 70%,
            rgba(65, 220, 204, 0.007) 85%,
            transparent 100%
        );
    }

    /* Yellow accent splashes */
    .blob-yellow-1 {
        top: 45%;
        left: 10%;
        width: 25vw;
        height: 25vw;
        animation: float 26s infinite alternate-reverse;
        background: radial-gradient(
            circle at center,
            rgba(255, 223, 89, 0.35) 0%,
            rgba(255, 223, 89, 0.18) 30%,
            rgba(255, 223, 89, 0.07) 50%,
            rgba(255, 223, 89, 0.02) 70%,
            rgba(255, 223, 89, 0.005) 85%,
            transparent 100%
        );
    }

    .blob-yellow-2 {
        bottom: 35%;
        right: 15%;
        width: 28vw;
        height: 28vw;
        animation: float 23s infinite alternate;
        background: radial-gradient(
            circle at center,
            rgba(255, 200, 100, 0.3) 0%,
            rgba(255, 200, 100, 0.15) 30%,
            rgba(255, 200, 100, 0.06) 50%,
            rgba(255, 200, 100, 0.018) 70%,
            rgba(255, 200, 100, 0.005) 85%,
            transparent 100%
        );
    }

    @keyframes float {
        0% {
            transform: translate(0, 0) scale(1);
        }
        100% {
            transform: translate(30px, 30px) scale(1.1);
        }
    }

    @media (max-width: 768px) {
        .blob {
            opacity: 0.6;
        }
    }
</style>
