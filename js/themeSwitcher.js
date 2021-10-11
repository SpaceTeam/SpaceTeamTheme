var __pathOffset;
var __themes;
var __subscribers = [];

//theme is a dict of an icon (string), the name of the theme file (without .css) and the type (light, dark, in future maybe more?)
//change behaviour if more than two themes are given (dropdown or the like)
function setInitialTheme(pathOffset, themes)
{
    __pathOffset = pathOffset;
    __themes = themes;
    theme.setAttribute('href', `${__pathOffset}themes/${__themes[0]['theme']}.css`);
}

function initThemes(switcherContainer, pathOffset, themes)
{
    setInitialTheme(pathOffset, themes);
    let themeButtonHtml = `<button type="button" id="themeSwitcher" class="btn btn-outline-secondary" onclick="toggleTheme()">
    <i class="bi bi-${__themes[1]['icon']}"></i>
</button>`;
    switcherContainer.append(themeButtonHtml);
    //$(document.body).append(themeSwitcherDiv);
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
        //console.log("dispatched event to", subscriber);
        subscriber.dispatchEvent(event);
    });
}

function getActiveTheme()
{
    if (theme.getAttribute('href') == `${__pathOffset}themes/${__themes[0]['theme']}.css`)
    {
        return __themes[0];
    }
    else if (theme.getAttribute('href') == `${__pathOffset}themes/${__themes[1]['theme']}.css`)
    {
        return __themes[1];
    }
    return undefined;
}

function themeSubscribe(elem, listener)
{
    //this implementation doesn't allow the same element to subscribe with two listeners - would I ever want that? if so, it could be handled by a "wrapper listener" that pushes the event to other "sub listeners"
    if (!__subscribers.includes(elem[0]))
    {
        elem[0].addEventListener("themeToggle", listener);
        __subscribers.push(elem[0]);
        let theme = getActiveTheme();
        const event = new CustomEvent('themeToggle', {detail: {theme: theme['theme'], type: theme['type']}});
        elem[0].dispatchEvent(event);
        return true;
    }
    return false;
}



