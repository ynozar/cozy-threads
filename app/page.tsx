import Gradient from "@/app/gradient";

export default function Home() {
  return (
    <>
      <div className="hero fade-in bg-base-200 min-h-screen">
        <Gradient
          darkGradient={`bg-gradient-to-tr from-gray-900 to-green-900`}
          lightGradient={`bg-gradient-to-tr from-sky-100 via-neutral-100 to-green-200`}
        />
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/hero.webp"
            className="max-w-60 md:max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-xl md:text-6xl font-bold">
              Welcome to <i>Cozy Threads</i>
            </h1>
            <p className="py-6">
              Here at Cozy Threads, we sell high-quality, ethically-sourced
              apparel and accessories.
            </p>
            <a href="catalog" className="btn btn-success">
              Start Shopping
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
