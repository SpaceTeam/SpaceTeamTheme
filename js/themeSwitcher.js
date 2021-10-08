var __pathOffset;
var __themes;
var __themePrimary;
var __themeSecondary;

function initThemes(pathOffset, themes)
{
    __pathOffset = pathOffset;
    __themes = themes;
    theme.setAttribute('href', `${pathOffset}themes/${__themes[0]['theme']}.css`);
}

//theme is a dict of an icon (string) and the name of the theme file (without .css)
//change behaviour if more than two themes are given (dropdown or the like)
function createThemeSwitcher()
{
    let themeButtonHtml = `<button type="button" id="themeSwitcher" class="btn btn-outline-secondary" onclick="toggleTheme()">
    <i class="bi bi-${__themes[1]['icon']}"></i>
</button>`;
    return themeButtonHtml;
}

function toggleTheme()
{
    let themeSwitcherButton = $(document).find("button#themeSwitcher");
    let newTheme;
    let newIcon;
    if (theme.getAttribute('href') == `${pathOffset}themes/${__themes[0]['theme']}.css`)
    {
        newTheme = __themes[1]['theme'];
        newIcon = __theme[0]['icon'];
    } 
    else if (theme.getAttribute('href') == `${pathOffset}themes/${__themes[1]['theme']}.css`)
    {
        newTheme = __themes[0]['theme'];
        newIcon = __themes[1]['icon'];
    }

    theme.setAttribute('href', `${pathOffset}themes/${newTheme}.css`);
    themeSwitcherButton.html(`<i class="bi bi-${newIcon}"></i>`);

    const event = new CustomEvent('themeToggle', {detail: {theme: newTheme}});
    themeSwitcherButton.dispatchEvent(event);
}
