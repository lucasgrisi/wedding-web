from pydantic import BaseModel

class Item(BaseModel):
    id: str
    price: float
    title: str
    description: str = None
    quantity: int
    total_price: float
    img: str
    sold: int = 0
    available: bool = True
    relevance: int