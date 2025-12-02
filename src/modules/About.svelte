<script>
    export let title = "About";
    import "../styles/main.css";

    function formatNumbers(text) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match) => `<span class="modern-num">${match}</span>`,
        );
    }
</script>

<div class="hero">
    <div class="left">
        <div class="title-left"><h1>ABOUT US</h1></div>
        <h2 class="subtitle">TEAM 20912 / RO 002</h2>

        <p class="description">
            {@html formatNumbers(`Lorem ipsum dolor sit amet consectetur adipiscing elit. Pretium
            tellus duis convallis tempus leo eu aenean. Iaculis massa nisl
            malesuada lacinia integer nunc posuere. Conubia nostra inceptos
            himenaeos orci varius natoque penatibus. Nulla molestie mattis
            scelerisque maximus eget fermentum odio. Blandit quis suspendisse
            aliquet nisi sodales consequat magna. Ligula congue sollicitudin
            erat viverra ac tincidunt nam. Velit aliquam imperdiet mollis nullam
            volutpat porttitor ullamcorper. Dui felis venenatis ultrices proin
            libero feugiat tristique.`)}
        </p>

        <nav class="nav-buttons">
            <a href="#home" class="btn">HOME</a>
            <a href="#about" class="btn selected">ABOUT US</a>
            <a href="#sponsors" class="btn">SPONSORS</a>
            <a href="#members" class="btn">MEMBERS</a>
            <a href="#events" class="btn">EVENTS</a>
            <a href="#results" class="btn">RESULTS</a>
            <a href="#gallery" class="btn">GALLERY</a>
        </nav>
        <div class="map-container">
            <a href="#map" class="btn btn-map">MAP</a>
        </div>
    </div>

    <div class="right">
        <div class="important-image">
            <img src="src/assets/team_photo.png" />
        </div>
    </div>
</div>
