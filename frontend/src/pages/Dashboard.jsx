import { useEffect, useState, useContext, useMemo } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [sweets, setSweets] = useState([]);
  const [editingSweet, setEditingSweet] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  });

  /* ---------- FETCH ---------- */
  const fetchSweets = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/sweets");
      setSweets(res.data);
    } catch {
      setError("Failed to load sweets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  /* ---------- CATEGORY OPTIONS ---------- */
  const categories = useMemo(() => {
    const set = new Set(sweets.map(s => s.category).filter(Boolean));
    return Array.from(set);
  }, [sweets]);

  /* ---------- SEARCH ---------- */
  const searchSweets = async () => {
    try {
      const params = {};
      if (filters.name) params.name = filters.name;
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const res = await api.get("/api/sweets/search", { params });
      setSweets(res.data);
    } catch {
      setError("Search failed.");
    }
  };

  /* ---------- QUICK PURCHASE ---------- */
  const quickPurchase = async (id) => {
    try {
      await api.post(`/api/sweets/${id}/purchase`, { quantity: 1 });
      fetchSweets();
    } catch {
      alert("Purchase failed. Not enough stock.");
    }
  };

  /* ---------- ADMIN ACTIONS ---------- */
  const addSweet = async (e) => {
    e.preventDefault();
    if (!newSweet.name || !newSweet.category || !newSweet.price || !newSweet.quantity) {
      setFormError("All fields are required.");
      return;
    }

    try {
      setFormError("");
      await api.post("/api/sweets", {
        ...newSweet,
        price: Number(newSweet.price),
        quantity: Number(newSweet.quantity)
      });
      setNewSweet({ name: "", category: "", price: "", quantity: "" });
      fetchSweets();
    } catch {
      setFormError("Failed to add sweet.");
    }
  };

  const updateSweet = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/sweets/${editingSweet._id}`, {
        ...editingSweet,
        price: Number(editingSweet.price),
        quantity: Number(editingSweet.quantity)
      });
      setEditingSweet(null);
      fetchSweets();
    } catch {
      setFormError("Update failed.");
    }
  };

  const deleteSweet = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;
    await api.delete(`/api/sweets/${id}`);
    fetchSweets();
  };

  const restockSweet = async (id) => {
    await api.post(`/api/sweets/${id}/restock`, { quantity: 5 });
    fetchSweets();
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">
        {/* SEARCH */}
        <div className="section">
          <h3>Search Sweets</h3>

          <input
            className="input"
            placeholder="Name"
            value={filters.name}
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
          />

          {/* CATEGORY DROPDOWN */}
          <select
            className="input"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />

          <input
            className="input"
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />

          <button className="btn" onClick={searchSweets}>
            Search
          </button>
          <button className="btn secondary" onClick={fetchSweets}>
            Reset
          </button>
        </div>

        {/* ADD SWEET (ADMIN) */}
        {user?.role === "admin" && (
          <form className="section" onSubmit={addSweet}>
            <h3>Add Sweet</h3>
            {formError && <p className="error">{formError}</p>}

            <input className="input" placeholder="Name"
              value={newSweet.name}
              onChange={(e) =>
                setNewSweet({ ...newSweet, name: e.target.value })
              }
            />

            <input className="input" placeholder="Category"
              value={newSweet.category}
              onChange={(e) =>
                setNewSweet({ ...newSweet, category: e.target.value })
              }
            />

            <input className="input" type="number" placeholder="Price"
              value={newSweet.price}
              onChange={(e) =>
                setNewSweet({ ...newSweet, price: e.target.value })
              }
            />

            <input className="input" type="number" placeholder="Quantity"
              value={newSweet.quantity}
              onChange={(e) =>
                setNewSweet({ ...newSweet, quantity: e.target.value })
              }
            />

            <button className="btn">Add</button>
          </form>
        )}

        {/* UPDATE SWEET (ADMIN) */}
        {user?.role === "admin" && editingSweet && (
          <form className="section" onSubmit={updateSweet}>
            <h3>Update Sweet</h3>

            <input className="input"
              value={editingSweet.name}
              onChange={(e) =>
                setEditingSweet({ ...editingSweet, name: e.target.value })
              }
            />

            <input className="input"
              value={editingSweet.category}
              onChange={(e) =>
                setEditingSweet({ ...editingSweet, category: e.target.value })
              }
            />

            <input className="input" type="number"
              value={editingSweet.price}
              onChange={(e) =>
                setEditingSweet({ ...editingSweet, price: e.target.value })
              }
            />

            <input className="input" type="number"
              value={editingSweet.quantity}
              onChange={(e) =>
                setEditingSweet({ ...editingSweet, quantity: e.target.value })
              }
            />

            <button className="btn">Update</button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => setEditingSweet(null)}
            >
              Cancel
            </button>
          </form>
        )}

      {/* LIST */}
<div className="section">
  <h2 className="section-title">Sweets</h2>

  {loading && <p>Loading...</p>}
  {error && <p className="error">{error}</p>}

  <div className="sweet-table">
    {/* TABLE HEADER */}
    <div className="sweet-header">
      <span>Name</span>
      <span>Category</span>
      <span>Qty</span>
      <span>Price</span>
      <span>Actions</span>
    </div>

    {sweets.map((s) => (
      <div key={s._id} className="sweet-row">
        <span className="sweet-name">{s.name}</span>
        <span className="sweet-category">{s.category}</span>
        <span className="sweet-qty">{s.quantity}</span>
        <span className="sweet-price">₹{s.price}</span>

        <div className="sweet-right">
          {user?.role !== "admin" && (
            <>
              <button
                className="btn primary"
                disabled={s.quantity === 0}
                onClick={() =>
                  addToCart({
                    _id: s._id,
                    name: s.name,
                    price: s.price,
                    availableStock: s.quantity
                  })
                }
              >
                Add to Cart
              </button>

              <button
                className={`btn ${s.quantity === 0 ? "disabled" : "success"}`}
                disabled={s.quantity === 0}
                onClick={() => quickPurchase(s._id)}
              >
                {s.quantity === 0 ? "Out of Stock" : "Purchase"}
              </button>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <button
                className="btn secondary"
                onClick={() => setEditingSweet(s)}
              >
                Edit
              </button>
              <button
                className="btn danger"
                onClick={() => deleteSweet(s._id)}
              >
                Delete
              </button>
              <button
                className="btn primary"
                onClick={() => restockSweet(s._id)}
              >
                Restock
              </button>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </>
  );
};

export default Dashboard;
