// import guides from '../../../data/';

// interface GuidePageProps {
//   params: { slug: string };
// }

// export default function GuidePage({ params }: GuidePageProps) {
//   const guide = guides.find(g => g.slug === params.slug);

//   if (!guide) return <div>Гид не найден</div>;

//   return (
//     <div>
//       <h1>{guide.title}</h1>
//       <p>{guide.description}</p>
//       {guide.steps?.map((step, i) => (
//         <div key={i}>
//           <h3>Шаг {i + 1}</h3>
//           <p>{step}</p>
//         </div>
//       ))} 
//     </div>
//   );
// }
