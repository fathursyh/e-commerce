import type { APIRoute } from "astro";
const product = [
    {
        id: '1fds2',
        title: "Headset Razer",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
        price: 2400000,
        desc: "Cool stuff.",
        stock: 40,
      }
];
export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      data: product,
    })
  );
};