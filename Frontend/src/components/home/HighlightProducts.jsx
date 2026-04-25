import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ui/cards/ProductCard';
import imgDrone from '../../assets/images/product_drone.png';
import imgHumanoid from '../../assets/images/robot_humanoid.png';
import imgWalle from '../../assets/images/robot_walle.png';
import imgRover from '../../assets/images/robot_rover.png';
import imgFighter from '../../assets/images/ship_fighter.png';
import imgCargo from '../../assets/images/ship_cargo.png';
import imgScout from '../../assets/images/ship_scout.png';

const products = [
    { id: 1, name: 'Phantom Drone V2', category: 'Drone', price: '$699', rating: 4.8, sold: 1204, shortDes: 'Professional 8K drone with AI avoidance.', img: imgDrone, desc: 'Professional drone with 8K camera, 15km flight range and AI obstacle avoidance system.', specs: [['Camera', '8K HDR'], ['Range', '15km'], ['Battery', '45 min']] },
    { id: 2, name: 'Titan Humanoid X', category: 'Humanoid Robot', price: '$8,299', rating: 4.9, sold: 342, shortDes: 'Next-gen bipedal robot for extreme tasks.', img: imgHumanoid, desc: 'Next-generation bipedal humanoid robot with advanced hydraulic system, exceptional balance and human-like agility.', specs: [['Height', '1.5m'], ['Payload', '25kg'], ['Actuator', 'Hydraulic 28 DOF']] },
    { id: 3, name: 'Buddy Bot Mini', category: 'Companion Robot', price: '$1,399', rating: 4.7, sold: 890, shortDes: 'Adorable companion robot with stereo vision.', img: imgWalle, desc: 'Compact companion robot with adorable personality, track-belt mobility, stereo vision cameras and multi-purpose gripper arms.', specs: [['Mobility', 'Track Belt'], ['Camera', 'Stereo Vision'], ['Battery', '18 hrs']] },
    { id: 4, name: 'Explorer Rover S6', category: 'Exploration Robot', price: '$3,499', rating: 4.6, sold: 560, shortDes: '6-wheel rover for complex terrain.', img: imgRover, desc: 'Six-wheel exploration robot with independent suspension, 360° LiDAR sensors and complex terrain traversal capability.', specs: [['Wheels', '6 Independent'], ['Sensors', 'LiDAR + IR'], ['Range', '50km']] },
    { id: 5, name: 'Viper Star Fighter', category: 'Star Fighter', price: '$107,000', rating: 5.0, sold: 12, shortDes: 'Lightweight fighter with ion engines.', img: imgFighter, desc: 'Lightweight star fighter with dual laser weapon system, high-speed ion engines and self-healing nano armor plating.', specs: [['Engine', 'Ion Thrust x2'], ['Weapons', 'Dual Laser'], ['Speed', 'Mach 8.5']] },
    { id: 6, name: 'Atlas Cargo Hauler', category: 'Cargo Ship', price: '$253,000', rating: 4.5, sold: 8, shortDes: 'Heavy transport with 500-ton capacity.', img: imgCargo, desc: 'Heavy cargo transport with 500-ton capacity, AI navigation system and hyperspace jump capability.', specs: [['Payload', '500 tons'], ['Crew', '12 crew'], ['FTL', 'Warp Drive v3']] },
    { id: 7, name: 'Nebula Scout Ship', category: 'Scout Ship', price: '$52,000', rating: 4.8, sold: 45, shortDes: 'Stealth scout with signal cloaking.', img: imgScout, desc: 'Stealth scout ship with wide-band scanner array, multi-spectrum sensors and signal cloaking technology.', specs: [['Stealth', 'Active Cloak'], ['Radar', 'Multi-spectrum'], ['Scan Range', '500,000 km']] },
    { id: 8, name: 'Spectre Drone Nano', category: 'Drone', price: '$389', rating: 4.9, sold: 2100, shortDes: 'Compact 4K drone with gesture control.', img: imgDrone, desc: 'Ultra-compact mini drone with 4K camera, indoor flight capability and gesture control system.', specs: [['Camera', '4K 60fps'], ['Weight', '249g'], ['Battery', '35 min']] },
    { id: 9, name: 'Scout Rover Lite', category: 'Exploration Robot', price: '$1,999', rating: 4.7, sold: 840, shortDes: 'Compact scout robot for 3D mapping.', img: imgRover, desc: 'Compact scout robot for terrain surveying, sample collection and automated 3D mapping missions.', specs: [['Mapping', '3D SLAM'], ['Connectivity', '5G + Satellite'], ['Battery', '12 hrs']] },
];

export default function HighlightProducts() {
    const navigate = useNavigate();

    return (
        <>
            <section className="py-[100px] relative z-[1]" id="products-section">
                <div className="max-w-[1320px] mx-auto px-6 relative z-[1]">
                    <div className="text-center mb-[60px]">
                        <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] mb-3 text-white">Featured <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Products</span></h2>
                        <p className="text-white/75 text-[1rem] font-light">Cutting-edge technology, designed from the future</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((p, i) => (
                            <div key={p.id} style={{ animationDelay: `${(i + 1) * 0.1}s` }} className="animate-[fadeInUp_0.6s_ease-out_backwards] h-full">
                                <ProductCard product={p} onSelect={(product) => navigate(`/product/${product.id}`)} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
