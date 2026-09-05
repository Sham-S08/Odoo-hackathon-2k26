from fastapi.testclient import TestClient


def test_health_check_returns_healthy(client: TestClient):
    response = client.get("/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "HEALTHY"
    assert data["version"] == "1.0.0"
    assert data["service"] == "dealflow360-ai"
