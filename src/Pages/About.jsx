import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function About() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center bg-base-200/30 backdrop-blur-sm text-primary p-8 rounded-lg shadow-lg border border-primary/20 max-w-4xl mx-auto min-h-[40rem] mt-16 mb-16">
        <h1 className="text-4xl font-cyber mb-6">About CryptoVista</h1>

        <p className="text-lg text-base-content mb-8 text-center">
          CryptoVista is a state-of-the-art web application developed by 
          <span className="text-primary font-cyber"> Mayur Prajapati</span>. 
          The platform empowers users to monitor cryptocurrency prices, track market trends, and analyze historical data with ease. With a sleek design and robust functionality, CryptoVista delivers real-time updates and insightful visualizations to crypto enthusiasts, traders, and investors.
        </p>

        <h2 className="text-2xl font-cyber mb-4">Tech Stack Used</h2>
        <ul className="text-base-content text-lg list-disc list-inside mb-8">
          <li>
            <span className="text-primary font-cyber">React:</span> A powerful library for building dynamic and fast web interfaces.
          </li>
          <li>
            <span className="text-primary font-cyber">Tailwind CSS:</span> A utility-first CSS framework for rapid and responsive UI development.
          </li>
          <li>
            <span className="text-primary font-cyber">DaisyUI:</span> Provides pre-designed Tailwind components, accelerating UI implementation.
          </li>
          <li>
            <span className="text-primary font-cyber">React Query:</span> Efficient data fetching and caching to ensure real-time updates.
          </li>
          <li>
            <span className="text-primary font-cyber">ApexCharts:</span> Creates interactive and customizable charts for data visualization.
          </li>
        </ul>

        <h2 className="text-2xl font-cyber mb-4">Features</h2>
        <ul className="text-base-content text-lg list-disc list-inside mb-8">
          <li>Real-time cryptocurrency price updates across multiple currencies.</li>
          <li>Interactive charts for visualizing market trends and historical prices.</li>
          <li>Responsive design for smooth usage on all devices, from mobile to desktop.</li>
          <li>Customizable timeframes and currencies to suit user preferences.</li>
          <li>Enhanced user experience with a modern and intuitive UI.</li>
        </ul>

        <h2 className="text-2xl font-cyber mb-4">Why This Stack?</h2>
        <p className="text-base-content text-lg mb-8">
          The tech stack was carefully selected to balance performance, scalability, and developer productivity. React provides a strong foundation for dynamic UI components, while Tailwind CSS and DaisyUI streamline the design process. React Query simplifies API data management, and ApexCharts ensures powerful and responsive visualizations.
        </p>

        <h2 className="text-2xl font-cyber mb-4">Future Plans</h2>
        <ul className="text-base-content text-lg list-disc list-inside mb-8">
          <li>Introduce user authentication to allow personalized watchlists.</li>
          <li>Incorporate advanced analytics for better market insights.</li>
          <li>Enable real-time push notifications for price alerts.</li>
          <li>Expand support to include more cryptocurrencies and exchanges.</li>
          <li>Build a mobile app for seamless tracking on the go.</li>
        </ul>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-cyber mb-4">Connect With Me</h2>
          <div className="flex gap-6">
            <a
              href="https://github.com/Mayurprajapati6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 text-lg font-cyber transition-colors duration-200"
            >
              <FaGithub size={24} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mayurprajapati068/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 text-lg font-cyber transition-colors duration-200"
            >
              <FaLinkedin size={24} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
