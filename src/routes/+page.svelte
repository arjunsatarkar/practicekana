<script>
    import App from "./App.svelte";
    import NotoSansJPRegular from "../assets/fonts/Noto_Sans_JP/static/NotoSansJP-Regular.ttf";
    // @ts-ignore
    import image from "../assets/sutaa.png?format=webp&w=1024&quality=100&effort=max&lossless";

    const title = "Practice Kana Words";
    const description =
        "Practice the katakana and hiragana you've learned by reading words, then see their meanings.";
</script>

<svelte:head>
    <link
        rel="preload"
        href={NotoSansJPRegular}
        as="font"
        type="font/ttf"
        crossorigin=""
    />
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={__APP_HOME__} />
    <meta property="og:image" content="{image}" />
    <meta property="og:description" content={description} />
</svelte:head>

<App></App>
