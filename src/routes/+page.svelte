<script>
    import App from "./App.svelte";
    //import NotoSansJPRegular from "../assets/fonts/NotoSansJP/NotoSansJP-Regular.otf";
    // @ts-ignore
    import image from "$lib/assets/sutaa.png?format=webp&w=1024&quality=100&effort=max&lossless";
    import NotoSansJP from "$lib/assets/fonts/NotoSansJP/NotoSansJP-Regular.otf";

    const title = "Practice Kana Words";
    const description =
        "Practice the katakana and hiragana you've learned by reading words, then see their meanings.";
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={__APP_HOME__} />
    <meta property="og:image" content={image} />
    <meta property="og:description" content={description} />
    <link
        rel="preload"
        href={NotoSansJP}
        as="font"
        type="font/otf"
        crossorigin="anonymous"
    />
</svelte:head>

<App></App>
