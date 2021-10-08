var __pathOffset;
var __themes;
var __themePrimary;
var __themeSecondary;
var __subscribers = [];

function initThemes(pathOffset, themes)
{
    __pathOffset = pathOffset;
    __themes = themes;
    theme.setAttribute('href', `${__pathOffset}themes/${__themes[0]['theme']}.css`);
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
    let newType;
    if (theme.getAttribute('href') == `${__pathOffset}themes/${__themes[0]['theme']}.css`)
    {
        newTheme = __themes[1]['theme'];
        newType = __themes[1]['type'];
        newIcon = __themes[0]['icon'];
    } 
    else if (theme.getAttribute('href') == `${__pathOffset}themes/${__themes[1]['theme']}.css`)
    {
        newTheme = __themes[0]['theme'];
        newType = __themes[0]['type'];
        newIcon = __themes[1]['icon'];
    }

    theme.setAttribute('href', `${__pathOffset}themes/${newTheme}.css`);
    themeSwitcherButton.html(`<i class="bi bi-${newIcon}"></i>`);

    const event = new CustomEvent('themeToggle', {detail: {theme: newTheme, type: newType}});

    __subscribers.forEach((subscriber) => {
        subscriber.dispatchEvent(event);
    });
}

function subscribe(elem, listener)
{
    //this implementation doesn't allow the same element to subscribe with two listeners - would I ever want that? if so, it could be handled by a "wrapper listener" that pushes the event to other "sub listeners"
    if (!__subscribers.includes(elem))
    {
        elem.addEventListener("themeToggle", listener);
        __subscribers.push(elem);
        return true;
    }
    return false;
}



