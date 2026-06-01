Bun.serve({
  port: 3000,

  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      return Response.json({
        message: "Hello Bun!",
      });
    }

    if (url.pathname === "/users") {
      return Response.json([
        { id: 1, name: "Pouria" },
        { id: 2, name: "Ali" },
      ]);
    }

    return new Response("Not Found", {
      status: 404,
    });
  },
});

console.log("Server running on http://localhost:3000");
