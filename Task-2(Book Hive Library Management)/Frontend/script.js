const DB_URL = 'http://localhost:3000/books';

// 1. FETCH & DISPLAY (Read + Filters)
async function fetchLibrary(filterType = '') {
    let url = DB_URL;
    
    // Logic for Filter Requirement
    if (filterType === 'recent') url += '?new=true';
    if (filterType === 'fiction') url += '?category=Fiction';

    try {
        const res = await fetch(url);
        const data = await res.json();
        const list = document.getElementById('library-list');
        
        list.innerHTML = ''; // Clear current list

        data.forEach(item => {
            const li = document.createElement('li');
            li.className = 'book-row';
            
            // Visual logic for stock status
            const isAvailable = item.availableCopies > 0;
            const stockColor = isAvailable ? 'green' : 'red';

            li.innerHTML = `
                <div class="book-details">
                    <h4>${item.title}</h4>
                    <span class="meta-tag">${item.author}</span>
                    <span class="meta-tag">${item.publishedYear}</span>
                    <span class="meta-tag">${item.category}</span>
                    
                    <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px;">
                        <button onclick="updateStock('${item._id}', -1)" class="btn-update"> - </button>
                        <span style="color:${stockColor}; font-weight:bold; font-size: 0.9rem;">
                            Stock: ${item.availableCopies}
                        </span>
                        <button onclick="updateStock('${item._id}', 1)" class="btn-update"> + </button>
                    </div>
                </div>
                
                <button class="del-btn" onclick="removeEntry('${item._id}')">&times;</button>
            `;
            list.appendChild(li);
        });
    } catch (err) {
        console.error(err);
    }
}

// 2. UPLOAD NEW BOOK (Create)
async function submitBook() {
    // Get values from BookHive Inputs (b-title, etc.)
    const title = document.getElementById('b-title').value;
    const author = document.getElementById('b-author').value;
    const category = document.getElementById('b-category').value;
    const publishedYear = document.getElementById('b-year').value;
    const availableCopies = document.getElementById('b-copies').value;

    const payload = { title, author, category, publishedYear, availableCopies };

    const res = await fetch(DB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        fetchLibrary(); // Refresh list
        // Clear all inputs
        document.querySelectorAll('input').forEach(i => i.value = '');
    } else {
        const errorData = await res.json();
        alert('Upload Failed: ' + errorData.error);
    }
}

// 3. UPDATE STOCK (Update)
async function updateStock(id, change) {
    try {
        const res = await fetch(`${DB_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ change: change })
        });

        const data = await res.json();

        if (res.ok) {
            fetchLibrary(); // Refresh
        } else {
            alert('Update Error: ' + data.error); // Handles "Negative Stock"
        }
    } catch (err) {
        console.error(err);
    }
}

// 4. DELETE ENTRY (Delete)
async function removeEntry(id) {
    if (!confirm('Remove this book from archive?')) return;

    try {
        const res = await fetch(`${DB_URL}/${id}`, { method: 'DELETE' });
        const data = await res.json();

        if (res.ok) {
            fetchLibrary();
        } else {
            alert(data.message); // Handles "Copies > 0"
        }
    } catch (err) {
        console.error(err);
    }
}

// Initialize
fetchLibrary();