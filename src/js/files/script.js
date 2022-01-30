// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


document.addEventListener("click", documentActions);

function setNumberOfColls () {
    const menuBlocks = document.querySelectorAll('.sub-menu-catalog__block');
    if (menuBlocks.length) {
        menuBlocks.forEach(menuBlock => {
            const menuBlockItems = menuBlock.querySelectorAll('.sub-menu-catalog__category').length;
            menuBlock.setAttribute(`data-cols`, menuBlockItems);
        });
    }    
}

function documentActions(e) {
    setNumberOfColls();
    e.preventDefault();
    const activeLink = document.querySelector('._sub-menu-active');
    const activeBlock = document.querySelector('._sub-menu-open');
    const targetElem = e.target;

    if (targetElem.closest('[data-parent]')) {
        const subMenuId = targetElem.dataset.parent ? targetElem.dataset.parent : null;
        const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);

        function openClasses(cols) {
            subMenu.closest('div').style.cssText = `grid-template-columns: repeat(${cols}, 0.${cols}fr);`;

            if (activeLink && activeLink !== targetElem) {
                activeLink.classList.remove('_sub-menu-active');
                activeBlock.classList.remove('_sub-menu-open');
            }
            targetElem.classList.toggle('_sub-menu-active');
            subMenu.classList.toggle('_sub-menu-open');
        }

        if (subMenu) {
            let cols = subMenu.getAttribute('data-cols');
            openClasses(cols);
        } else {
            console.log('Hey Submenu doesnt exist');
        }
    } 
    // else {
    //     activeLink.classList.remove('_sub-menu-active');
    //     activeBlock.classList.remove('_sub-menu-open');
    // }
}
