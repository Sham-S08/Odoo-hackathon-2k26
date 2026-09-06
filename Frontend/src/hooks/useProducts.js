import { useCallback, useEffect, useState } from "react";
import { productsApi } from "../api/products.api";

export function useProducts(params) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productsApi.list(params);
      setProducts(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    refresh();
    const handleProductsChanged = () => refresh();
    const handleStorageChange = (event) => {
      if (event.key === "products:changed") refresh();
    };
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("dealflow-products") : null;
    channel?.addEventListener("message", handleProductsChanged);
    window.addEventListener("products:changed", handleProductsChanged);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      channel?.removeEventListener("message", handleProductsChanged);
      channel?.close();
      window.removeEventListener("products:changed", handleProductsChanged);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refresh]);

  return { products, loading, error, refresh };
}
