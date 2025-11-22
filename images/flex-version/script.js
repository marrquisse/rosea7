
document.addEventListener('DOMContentLoaded', () => {

   const block1 = document.querySelector('.b1');
const block2 = document.querySelector('.b2');
const block3 = document.querySelector('.love-block');
const block4 = document.querySelector('.b4');
const block5 = document.querySelector('.b5');
const block6 = document.querySelector('.b6');
const block7 = document.querySelector('.b7');

function task1_swapContent() {
    if (block3 && block6) {
        console.log("Завдання 1: Міняю місцями .love-block (Блок 3) та .b6 (Блок 6)");
        
        const tempContent = block3.innerHTML;
        
        block3.innerHTML = block6.innerHTML;
        
        block6.innerHTML = tempContent;
    } else {
        console.error("Завдання 1: Не знайдено Блок 3 (.love-block) або Блок 6 (.b6)");
    }
}

function task2_calculateArea() {
    if (!block5) return;

    const base = 20; 
    const height = 10;

    function calculateParallelogramArea(b, h) {
        return b * h;
    }

    const area = calculateParallelogramArea(base, height);
    
    const resultElement = document.createElement('p');
    resultElement.innerHTML = `<strong>(Завдання 2)</strong> Площа паралелограма (основа ${base}, висота ${height}) = <strong>${area}</strong>`;
    resultElement.style.borderTop = "1px solid #eee";
    resultElement.style.paddingTop = "15px";
    
    block5.appendChild(resultElement);
    console.log("Завдання 2: Площу пораховано і додано в Блок 5.");
}

function task3_handleCookies() {
    const form = document.getElementById('max-digit-form');
    const input = document.getElementById('number-input');
    const formContainer = document.getElementById('task3-container').querySelector('form');
    const clearBtn = document.getElementById('clear-cookie-btn');

    if (!form || !input || !clearBtn) {
        console.error("Завдання 3: Не знайдено елементи форми.");
        return;
    }

    function setCookie(name, value, days = 7) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999; path=/';
    }

    function findMaxDigit(numberString) {
        const digitsOnly = numberString.replace(/[^0-9]/g, '');
        if (digitsOnly.length === 0) return 0;
        return Math.max(...digitsOnly.split('')); 
    }

    const savedDigit = getCookie('maxDigit');
    if (savedDigit) {
        alert(`(Завдання 3а) Збережена максимальна цифра: ${savedDigit}`);
        formContainer.style.display = 'none'; 
        clearBtn.style.display = 'block';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const maxDigit = findMaxDigit(input.value);
        
        alert(`(Завдання 3) Максимальна цифра в числі ${input.value} -> ${maxDigit}`);
        setCookie('maxDigit', maxDigit);
        
        location.reload(); 
    });

    clearBtn.addEventListener('click', () => {
        deleteCookie('maxDigit');
        
        alert('(Завдання 3б) cookies видалено');
        
        location.reload(); 
    });
}

function task4_handleLocalStorageAlign() {
    const blocksToAlign = [block2, block4, block5].filter(b => b != null); 

    function restoreAlignments() {
        console.log("Завдання 4: Відновлюю вирівнювання з LocalStorage...");
        blocksToAlign.forEach((block) => {
            const blockKey = block.classList.item(0);
            const savedAlign = localStorage.getItem(`blockAlign-${blockKey}`);
            
            if (savedAlign === 'right') {
                block.style.textAlign = 'right';
            }
        });
    }

    function handleMouseOut(event) {
        const block = event.currentTarget;
        const blockKey = block.classList.item(0);

        block.style.textAlign = 'right';
        
        localStorage.setItem(`blockAlign-${blockKey}`, 'right');
        console.log(`Завдання 4: Збережено вирівнювання 'right' для .${blockKey}`);
    }

    restoreAlignments();
    
    blocksToAlign.forEach(block => {
        block.addEventListener('mouseout', handleMouseOut);
    });
}

function task5_handleLocalStorageLists() {
    const select = document.getElementById('block-selector');
    const listForm = document.getElementById('add-item-form');
    const listInput = document.getElementById('list-item-input');

    if (!select || !listForm || !listInput) {
        console.error("Завдання 5: Не знайдено елементи форми.");
        return;
    }

    const storageKey = 'dynamicLists';
    let activeBlockSelector = null;

    function loadListsFromStorage() {
        const listsData = JSON.parse(localStorage.getItem(storageKey)) || {};
        console.log("Завдання 5: Відновлюю списки з LocalStorage", listsData);

        for (const blockSelector in listsData) {
            const block = document.querySelector(blockSelector);
            const items = listsData[blockSelector];
            
            if (block && items && items.length > 0) {
                let ol = block.querySelector('ol.task5-list');
                if (!ol) {
                    ol = document.createElement('ol');
                    ol.className = 'task5-list';
                    block.appendChild(ol);
                }
                
                items.forEach(itemText => {
                    const li = document.createElement('li');
                    li.textContent = itemText;
                    ol.appendChild(li);
                });
            }
        }
    }

    select.addEventListener('change', () => {
        if (select.value) {
            activeBlockSelector = '.' + select.value;
            listForm.style.display = 'block';
        } else {
            activeBlockSelector = null;
            listForm.style.display = 'none';
        }
    });

    listForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!activeBlockSelector) return;

        const block = document.querySelector(activeBlockSelector);
        const text = listInput.value.trim();
        
        if (text && block) {
            let ol = block.querySelector('ol.task5-list');
            if (!ol) {
                ol = document.createElement('ol');
                ol.className = 'task5-list';
                block.appendChild(ol);
            }
            
            const li = document.createElement('li');
            li.textContent = text;
            ol.appendChild(li);

            const allLists = JSON.parse(localStorage.getItem(storageKey)) || {};
            if (!allLists[activeBlockSelector]) {
                allLists[activeBlockSelector] = [];
            }
            allLists[activeBlockSelector].push(text);
            localStorage.setItem(storageKey, JSON.stringify(allLists));

            listInput.value = '';
        }
    });

    loadListsFromStorage();
}

try { task1_swapContent(); } catch(e) { console.error("Помилка в Завданні 1:", e); }
try { task2_calculateArea(); } catch(e) { console.error("Помилка в Завданні 2:", e); }
try { task3_handleCookies(); } catch(e) { console.error("Помилка в Завданні 3:", e); }
try { task4_handleLocalStorageAlign(); } catch(e) { console.error("Помилка в Завданні 4:", e); }
try { task5_handleLocalStorageLists(); } catch(e) { console.error("Помилка в Завданні 5:", e); }

}); 