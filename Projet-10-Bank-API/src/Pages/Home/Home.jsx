import '../../assets/img/bank-tree.jpeg';
import iconchat from '../../assets/img/icon-chat.webp';
import iconsecurity from '../../assets/img/icon-security.webp';
import iconmoney from '../../assets/img/icon-money.webp';
import '../../assets/css/main.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import FeatureItem from '../../Components/Feature';

function Home() {
  const featuresData = [ // Store feature data in an array of objects
    {
      icon: iconchat,
      title: "You are our #1 priority",
      description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      icon: iconmoney,
      title: "More savings means higher rates",
      description: "The more you save with us, the higher your interest rate will be!",
    },
    {
      icon: iconsecurity,
      title: "Security you can trust",
      description: "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];
  return (
    <>
      <Header />


      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>


        <section className="features">
          <h2 className="sr-only">Features</h2>
          {featuresData.map((feature, index) => ( // Map over the features data
            <FeatureItem
              key={index} // Add a unique key for each item
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
