import React, { useState } from "react";
import "./SearchPage.css";

const initialBlogs = [
  { title: "Understanding JavaScript", category: "tech" },
  { title: "Healthy Lifestyle Tips", category: "lifestyle" },
  { title: "Learning React", category: "tech" },
  { title: "Education in the 21st Century", category: "education" },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(initialBlogs);

  // Function to filter blogs based on query and selected category
  const handleSearch = () => {
    const lowerQuery = query.toLowerCase();
    const results = initialBlogs.filter((blog) => {
      const matchesQuery = blog.title.toLowerCase().includes(lowerQuery);
      const matchesCategory = category ? blog.category === category : true;
      return matchesQuery && matchesCategory;
    });
    setFilteredBlogs(results);
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setFilteredBlogs(initialBlogs);
  };

  const handleAddBlog = () => {
    if (newTitle && newCategory) {
      const newBlog = {
        title: newTitle,
        category: newCategory,
      };
      setFilteredBlogs([...filteredBlogs, newBlog]);
      setNewTitle("");
      setNewCategory("");
    }
  };

  const handleCategoryClick = (selectedCategory) => {
    // Update only the category without modifying the search query
    setCategory(selectedCategory);

    // Filter blogs based on category and current query
    const lowerQuery = query.toLowerCase();
    const results = initialBlogs.filter((blog) => {
      const matchesQuery = blog.title.toLowerCase().includes(lowerQuery);
      const matchesCategory = selectedCategory ? blog.category === selectedCategory : true;
      return matchesQuery && matchesCategory;
    });
    setFilteredBlogs(results);
  };

  return (
    <div className="search-container">
      <h1>Search Blog</h1>

      <div className="search-section">
        <input
          type="text"
          className="search-box"
          placeholder="Search blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="filters">
          {/* Filter: Category Dropdown */}
          <select
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
          </select>
        </div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="add-blog-section">
        <input
          type="text"
          className="search-box"
          placeholder="Enter new blog title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <select
          className="filter-select"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="education">Education</option>
        </select>
        <button className="add-button" onClick={handleAddBlog}>
          Add Blog
        </button>
      </div>

      <button className="clear-filters" onClick={clearFilters}>
        Clear Filters
      </button>

      <div className="category-buttons">
        <button onClick={() => handleCategoryClick("")}>All</button>
        <button onClick={() => handleCategoryClick("tech")}>Tech</button>
        <button onClick={() => handleCategoryClick("lifestyle")}>Lifestyle</button>
        <button onClick={() => handleCategoryClick("education")}>Education</button>
      </div>

      <div className="results">
  {filteredBlogs.length > 0 ? (
    <ul>
      {filteredBlogs.map((blog, index) => (
        <li key={index} className="task-item">
          {blog.title}
        </li>
      ))}
    </ul>
  ) : (
    <p>No results found</p>
  )}
</div>

    </div>
  );
};

export default SearchPage;
