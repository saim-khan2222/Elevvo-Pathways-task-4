// Sample blog posts data
const categoryBackgrounds = {
  all: '',
  Tech: 'https://www.patterns.dev/img/reactjs/react-logo@3x.svg',
  Travel: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  Food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
};

const posts = [
  {
    title: "Exploring React Props & State",
    image: "https://source.unsplash.com/400x200/?react,code",
    description: "A beginner's guide to understanding props and state in React.",
    date: "2025-07-01",
    category: "Tech"
  },
  {
    title: "My Trip to the Swiss Alps",
    image: "https://source.unsplash.com/400x200/?alps,travel",
    description: "Sharing my experience and tips for traveling in the Swiss Alps.",
    date: "2025-06-20",
    category: "Travel"
  },
  {
    title: "Best Homemade Pizza Recipe",
    image: "https://source.unsplash.com/400x200/?pizza,food",
    description: "Step-by-step guide to making delicious pizza at home.",
    date: "2025-06-15",
    category: "Food"
  },
  {
    title: "Responsive Grid Layouts in CSS",
    image: "https://source.unsplash.com/400x200/?css,web",
    description: "How to build responsive grid layouts using modern CSS.",
    date: "2025-06-10",
    category: "Tech"
  },
  {
    title: "A Weekend in Paris",
    image: "https://source.unsplash.com/400x200/?paris,travel",
    description: "What to see, eat, and do during a short trip to Paris.",
    date: "2025-05-30",
    category: "Travel"
  },
  {
    title: "Quick & Easy Breakfast Ideas",
    image: "https://source.unsplash.com/400x200/?breakfast,food",
    description: "Healthy and tasty breakfast recipes for busy mornings.",
    date: "2025-05-25",
    category: "Food"
  },
  // Add more posts as needed
];

const POSTS_PER_PAGE = 4;
let currentPage = 1;
let currentCategory = 'all';
let currentSearch = '';

function filterPosts() {
  return posts.filter(post => {
    const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
    const matchesSearch = post.title.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function renderPosts() {
  const filtered = filterPosts();
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginated = filtered.slice(start, end);

  const postsGrid = document.getElementById('postsGrid');
  postsGrid.innerHTML = '';

  if (paginated.length === 0) {
    postsGrid.innerHTML = '<p>No posts found.</p>';
    document.getElementById('pageInfo').textContent = '';
    return;
  }

  paginated.forEach(post => {
    const card = document.createElement('div');
    card.className = 'card';
    let icon = '';
    if (post.category === 'Tech') {
      if (post.title.toLowerCase().includes('react')) {
        icon = 'react-props.jpeg';
      } else if (post.title.toLowerCase().includes('css')) {
        icon = 'css-grid.jpeg';
      } else {
        icon = 'icons/tech.png';
      }
    } else if (post.category === 'Travel') {
      if (post.title.toLowerCase().includes('paris')) {
        icon = 'icons/paris.png';
      } else if (post.title.toLowerCase().includes('swiss')) {
        icon = 'trip-swiss.jpeg';
      } else {
        icon = 'icons/travel.png';
      }
    } else if (post.category === 'Food') {
      if (post.title.toLowerCase().includes('pizza')) {
        icon = 'best-homemade-pizza.jpeg';
      } else if (post.title.toLowerCase().includes('breakfast')) {
        icon = 'quick-easy.jpeg';
      } else {
        icon = 'icons/food.png';
      }
    }
    card.innerHTML = `
      <div class="card-field-icon">
        <img src="${icon}" alt="${post.category} icon" />
      </div>
      <img src="${post.image}" alt="${post.title}">
      <div class="card-content">
        <div class="card-title">${post.title}</div>
        <div class="card-desc">${post.description}</div>
        <div class="card-date">${post.date} | ${post.category}</div>
      </div>
    `;
    postsGrid.appendChild(card);
  });

  // Pagination info
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
}


function updateControlsBackground() {
  const controlsBg = document.querySelector('.controls-bg');
  // Remove any previous SVG (cleanup from old version)
  const prevSVG = document.getElementById('controls-bg-svg');
  if (prevSVG) prevSVG.remove();
  const url = categoryBackgrounds[currentCategory] || '';
  if (url) {
    controlsBg.style.backgroundImage = `url('${url}')`;
  } else {
    controlsBg.style.backgroundImage = 'none';
  }
}

document.getElementById('categoryFilter').addEventListener('change', e => {
  currentCategory = e.target.value;
  currentPage = 1;
  renderPosts();
  updateControlsBackground();
});

document.getElementById('searchInput').addEventListener('input', e => {
  currentSearch = e.target.value;
  currentPage = 1;
  renderPosts();
});

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  const filtered = filterPosts();
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderPosts();
  }
});

// Initial render
renderPosts();
updateControlsBackground();
