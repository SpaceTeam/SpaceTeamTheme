var __pathOffset;
var __themes;
var __themePrimary;
var __themeSecondary;

function initThemes(pathOffset, themes)
{
    __pathOffset = pathOffset;
    __themes = themes;
}

//theme is a dict of an icon (string) and the name of the theme file (without .css)
//change behaviour if more than two themes are given (dropdown or the like)
function createThemeSwitcher()
{
    let themeButtonHtml = `<div>
        <button type="button" id="themeSwitcher" class="btn btn-outline-secondary" onclick="toggleTheme()">
            <i class="bi bi-${__themes[1]['icon']}"></i>
        </button>
    </div>`;
    return themeButtonHtml;
}

function toggleTheme()
{
    let themeSwitcherButton = $(document).find("button#themeSwitcher");
    //TODO: fetch prefix path first
    if (theme.getAttribute('href') == `${pathOffset}themes/${__themes[0]['theme']}.css`)
    {
        theme.setAttribute('href', `${pathOffset}themes/${__themes[1]['theme']}.css`);
        themeSwitcherButton.html(`<i class="bi bi-${__theme[0]['icon']}"></i>`);
    } 
    else if (theme.getAttribute('href') == `${pathOffset}themes/${__themes[1]['theme']}.css`)
    {
        theme.setAttribute('href', `${pathOffset}themes/${__themes[0]['theme']}.css`);
        themeSwitcherButton.html(`<i class="bi bi-${__themes[1]['icon']}"></i>`);
    }
}
