import { useMemo, useState } from "react";
import { Heart, Home as HomeIcon, ShoppingBag, Tag, UserRound, Plus, Minus, ArrowRight, MapPin, Clock3, Check, CreditCard, Wallet, Navigation, ChefHat, Bike, CircleCheck } from "lucide-react";
import "./index.css";

type Pizza = { id: number; name: string; description: string; price: number; image: string; tag?: string; category: string };

const pizzas: Pizza[] = [
  { id: 1, name: "Hot Honey", description: "Cup & char pepperoni, whipped ricotta, hot honey", price: 14, tag: "Best seller", category: "Popular", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Truffle Mushroom", description: "Roasted cremini, truffle cream, pecorino, thyme", price: 16, tag: "Vegetarian", category: "Vegetarian", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "The Diavola", description: "Spicy soppressata, fermented chili, mozzarella", price: 15, tag: "Spicy", category: "Popular", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Green Garden", description: "Zucchini, basil pesto, lemon ricotta, parmesan", price: 14, tag: "Fresh pick", category: "Vegetarian", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Margherita", description: "San Marzano tomato, fior di latte, basil, olive oil", price: 12, tag: "Classic", category: "Popular", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Burrata Bianca", description: "Garlic cream, burrata, basil, lemon zest, chili oil", price: 16, tag: "Vegetarian", category: "Vegetarian", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Brooklyn Meatball", description: "House meatballs, tomato sugo, mozzarella, oregano", price: 17, tag: "Hearty", category: "Meat lovers", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Smoky BBQ Chicken", description: "Charred chicken, smoked mozzarella, pickled onion", price: 17, tag: "New", category: "Meat lovers", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85" },
  { id: 9, name: "Garlic Knots", description: "Wood-fired knots, garlic butter, parmesan, marinara", price: 7, tag: "Shareable", category: "Sides", image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=900&q=85" },
  { id: 10, name: "Crispy Wings", description: "Eight wings, ember spice, ranch dip, celery", price: 11, tag: "Fan favorite", category: "Sides", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85" },
  { id: 11, name: "Blood Orange Soda", description: "Bright Italian soda, blood orange, crushed ice", price: 5, tag: "Cold", category: "Drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85" },
  { id: 12, name: "Ginger Lemonade", description: "Fresh lemon, ginger syrup, sparkling water", price: 5, tag: "Fresh", category: "Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85" },
];

const navItems = [
  { label: "Home", icon: HomeIcon }, { label: "Deals", icon: Tag }, { label: "Cart", icon: ShoppingBag }, { label: "Profile", icon: UserRound },
];

export default function App() {
  const [active, setActive] = useState("Home");
  const [category, setCategory] = useState("Popular");
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1 });
  const [liked, setLiked] = useState(false);
  const [notice, setNotice] = useState("");
  const [payment, setPayment] = useState("card");

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = useMemo(() => Object.entries(cart).reduce((sum, [id, qty]) => sum + (pizzas.find(p => p.id === Number(id))?.price || 0) * qty, 0), [cart]);
  const visible = pizzas.filter(p => p.category === category);

  function add(id: number) { setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 })); setNotice("Added to your bag"); setTimeout(() => setNotice(""), 1600); }
  function change(id: number, amount: number) { setCart(c => { const next = Math.max(0, (c[id] || 0) + amount); const copy = { ...c }; if (next === 0) delete copy[id]; else copy[id] = next; return copy; }); }

  return <div className="app-shell">
    <header className="topbar container">
      <div className="brand-mark"><span className="brand-flame">✦</span><span>ember<br /><i>pizza</i></span></div>
      <div className="delivery-pill"><MapPin size={14} /><span>Delivering to <strong>Brooklyn Heights</strong></span><span className="chevron">⌄</span></div>
      <button className="avatar-button" onClick={() => setActive("Profile")} aria-label="Open profile">DK</button>
    </header>

    <main className="container main-content">
      {active === "Home" && <>
        <section className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Wood-fired. Wildly good.</p>
            <h1>Good pizza<br /><em>is a mood.</em></h1>
            <p className="hero-sub">Small-batch dough, big-burn flavor.<br />Made for your kind of night.</p>
            <button className="primary-button" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>Build your order <ArrowRight size={17} /></button>
            <div className="rupee-ad"><div className="coin-shadow" /><div className="rupee-coin">₹</div><div className="rupee-copy"><span>FIRST ORDER</span><b>₹100 OFF</b><small>Use code: EMBER100</small></div><button onClick={() => { setNotice("Offer code copied: EMBER100"); setTimeout(() => setNotice(""), 1600); }}>Copy</button></div>
            <div className="mini-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>R</span></div><p><strong>4.9</strong> from 2,000+ happy slices</p></div>
          </div>
          <div className="hero-art"><div className="hero-sticker">New York<br /><b>in every<br />slice</b></div><img src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1100&q=90" alt="Fresh wood-fired pizza" /><div className="hero-caption"><span>01 / 04</span><span>Our signature pies <ArrowRight size={15} /></span></div></div>
        </section>

        <section className="quick-row"><div><span className="quick-icon"><Clock3 size={18} /></span><span><b>25–35 min</b><small>average delivery</small></span></div><div><span className="quick-icon"><span className="tiny-leaf">✦</span></span><span><b>Always fresh</b><small>never frozen</small></span></div><div><span className="quick-icon"><span className="tiny-leaf">♨</span></span><span><b>900° oven</b><small>serious heat</small></span></div></section>

        <section className="menu-section" id="menu"><div className="section-heading"><div><p className="eyebrow">The good stuff</p><h2>Pick your <em>pie.</em></h2></div><button className="text-button">View full menu <ArrowRight size={15} /></button></div>
          <div className="category-tabs">{["Popular", "Vegetarian", "Meat lovers", "Sides", "Drinks"].map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
          <div className="pizza-grid">{visible.map(pizza => <article className="pizza-card" key={pizza.id}><div className="pizza-image-wrap"><img src={pizza.image} alt={pizza.name} /><span className="pizza-tag">{pizza.tag}</span><button className={liked ? "heart liked" : "heart"} onClick={() => setLiked(!liked)} aria-label="Favorite pizza"><Heart size={17} fill={liked ? "currentColor" : "none"} /></button></div><div className="pizza-card-body"><div><h3>{pizza.name}</h3><p>{pizza.description}</p></div><div className="pizza-bottom"><span className="price">₹{pizza.price * 84}<small> / 12"</small></span><button className="add-button" onClick={() => add(pizza.id)}><Plus size={17} /> Add</button></div></div></article>)}</div>
        </section>
      </>}

      {active === "Deals" && <section className="simple-page"><p className="eyebrow">More slice, less spend</p><h1>Deals worth<br /><em>sharing.</em></h1><div className="deal-panel"><span className="deal-kicker">Tonight only</span><h2>Two pies.<br />One easy price.</h2><p>Pick any two 12” pizzas and get a side of garlic knots on us.</p><button className="primary-button" onClick={() => { setActive("Home"); setNotice("Deal added — pick your pies"); }}>Start a deal <ArrowRight size={17} /></button></div></section>}
      {active === "Cart" && <section className="simple-page cart-page"><p className="eyebrow">Your order</p><h1>Good choices<br /><em>in the bag.</em></h1><div className="cart-panel">{count ? <>{Object.entries(cart).map(([id, qty]) => { const p = pizzas.find(x => x.id === Number(id))!; return <div className="cart-line" key={id}><img src={p.image} alt="" /><div><h3>{p.name}</h3><p>₹{p.price * 84} each</p></div><div className="qty"><button onClick={() => change(p.id, -1)}><Minus size={14} /></button><b>{qty}</b><button onClick={() => change(p.id, 1)}><Plus size={14} /></button></div></div>})}<div className="cart-total"><span>Total</span><strong>₹{total * 84}.00</strong></div><button className="primary-button full" onClick={() => setActive("Checkout")}>Checkout <ArrowRight size={17} /></button></> : <div className="empty-cart"><ShoppingBag size={32} /><h3>Your bag is waiting.</h3><p>Add a pie to get started.</p><button className="primary-button" onClick={() => setActive("Home")}>Browse pizzas</button></div>}</div></section>}
      {active === "Checkout" && <section className="simple-page checkout-page"><button className="back-button" onClick={() => setActive("Cart")}>← Back to bag</button><p className="eyebrow">Almost there</p><h1>Make it<br /><em>yours.</em></h1><div className="checkout-layout"><div className="checkout-form"><div className="checkout-block"><div className="checkout-label"><span>01</span><div><h3>Delivery details</h3><p>Where should we bring the good stuff?</p></div></div><div className="address-card"><MapPin size={18} /><div><b>Brooklyn Heights</b><small>128 Montague St, Brooklyn, NY 11201</small></div><button>Change</button></div></div><div className="checkout-block"><div className="checkout-label"><span>02</span><div><h3>Payment method</h3><p>Choose how you’d like to pay</p></div></div><div className="payment-options"><button className={payment === "card" ? "payment-option selected" : "payment-option"} onClick={() => setPayment("card")}><CreditCard size={19} /><span><b>Card</b><small>•••• 4242</small></span><i>{payment === "card" && <Check size={14} />}</i></button><button className={payment === "cash" ? "payment-option selected" : "payment-option"} onClick={() => setPayment("cash")}><Wallet size={19} /><span><b>Cash on delivery</b><small>Pay when your pizza arrives</small></span><i>{payment === "cash" && <Check size={14} />}</i></button></div></div></div><aside className="checkout-summary"><p className="eyebrow">Order summary</p><div className="summary-row"><span>{count} item{count !== 1 ? "s" : ""}</span><b>₹{total * 84}.00</b></div><div className="summary-row"><span>Delivery</span><b className="free">Free</b></div><div className="summary-divider" /><div className="summary-row total-row"><span>Total</span><b>₹{total * 84}.00</b></div><button className="primary-button full" onClick={() => { setActive("Tracking"); setNotice("Order confirmed — we’re on it"); }}>Place order <ArrowRight size={17} /></button><small className="secure-note"><Check size={13} /> Secure checkout · No hidden fees</small></aside></div></section>}
      {active === "Tracking" && <section className="simple-page tracking-page"><div className="tracking-header"><div><p className="eyebrow"><span className="eyebrow-dot" /> Order #EMB-2048</p><h1>On its way<br /><em>to you.</em></h1></div><div className="eta-badge"><strong>28</strong><span>min<br />away</span></div></div><div className="tracking-card"><div className="map-art"><div className="map-grid" /><div className="map-route route-one" /><div className="map-route route-two" /><div className="map-pin pin-home"><MapPin size={15} /></div><div className="map-pin pin-pizza"><span>✦</span></div><div className="bike-marker"><Bike size={22} /></div><span className="map-street street-one">MONTAGUE ST</span><span className="map-street street-two">HICKS ST</span></div><div className="tracking-status"><div className="status-top"><div><span className="live-dot" /> <b>Live updates</b></div><span>Updated just now</span></div><div className="progress-line"><div className="progress-fill" /></div><div className="tracking-steps"><div className="tracking-step done"><span><CircleCheck size={17} /></span><b>Order confirmed</b><small>5:42 PM</small></div><div className="tracking-step done"><span><ChefHat size={17} /></span><b>In the oven</b><small>5:49 PM</small></div><div className="tracking-step current"><span><Bike size={17} /></span><b>On the way</b><small>Arriving soon</small></div></div></div></div><button className="text-button tracking-home" onClick={() => setActive("Home")}>Back to menu <ArrowRight size={15} /></button></section>}
      {active === "Profile" && <section className="simple-page profile-page"><p className="eyebrow">Your Ember account</p><h1>Hey, <em>Dev.</em></h1><div className="profile-card"><div className="big-avatar">DK</div><h2>Dev Kumar</h2><p>Brooklyn Heights · Member since 2024</p><div className="profile-stats"><span><b>12</b><small>orders</small></span><span><b>4</b><small>favorites</small></span><span><b>₹1,512</b><small>saved</small></span></div></div><div className="profile-details"><div className="profile-detail-head"><div><p className="eyebrow">Your details</p><h2>Make it easy.</h2></div><button className="text-button">Edit profile</button></div><div className="detail-row"><span className="detail-icon"><MapPin size={17} /></span><div><small>Default delivery address</small><b>128 Montague St, Brooklyn Heights</b></div><ArrowRight size={15} /></div><div className="detail-row"><span className="detail-icon"><CreditCard size={17} /></span><div><small>Preferred payment</small><b>Visa ending in 4242</b></div><ArrowRight size={15} /></div><div className="detail-row"><span className="detail-icon"><Heart size={17} /></span><div><small>Go-to order</small><b>Hot Honey · extra ricotta</b></div><ArrowRight size={15} /></div></div><div className="profile-details order-history"><div className="profile-detail-head"><div><p className="eyebrow">Recent orders</p><h2>Your slice history.</h2></div><button className="text-button">See all</button></div><div className="history-row"><span className="history-pizza">✦</span><div><b>#EMB-2047 · Hot Honey</b><small>Yesterday · Delivered</small></div><strong>₹1,176</strong></div><div className="history-row"><span className="history-pizza green">✦</span><div><b>#EMB-2031 · Truffle Mushroom</b><small>Aug 28 · Delivered</small></div><strong>₹1,344</strong></div></div></section>}
    </main>

    <nav className="bottom-nav">{navItems.map(({ label, icon: Icon }) => <button key={label} className={active === label ? "selected" : ""} onClick={() => setActive(label)}><span className="nav-icon"><Icon size={20} strokeWidth={active === label ? 2.5 : 1.8} />{label === "Cart" && count > 0 && <i>{count}</i>}</span><span>{label}</span></button>)}</nav>
    {notice && <div className="toast"><Check size={16} /> {notice}</div>}
  </div>;
}

export { App };
