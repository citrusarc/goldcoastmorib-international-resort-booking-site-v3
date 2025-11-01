// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import ReactCountryFlag from "react-country-flag";
// import { useState, useEffect } from "react";

// import { cormorantGaramond } from "@/config/fonts";
// import { mapAccommodationsData } from "@/lib/mapAccommodationsData";
// import { SuccessModal, ErrorModal } from "@/components/ui/Modal";

// export default function AccommodationsDetailsPage() {
//   const { slug } = useParams();
//   const router = useRouter();
//   const [submitting, setSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [accommodations, setAccommodations] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAccommodation = async () => {
//       try {
//         const res = await fetch(`/api/accommodations/${slug}`);
//         if (!res.ok) throw new Error("Failed to fetch accommodations");
//         const data = await res.json();
//         setAccommodations(data.map(mapAccommodationsData));
//       } catch (err) {
//         console.error("Error fetching accommodations:", err);
//         setErrorMessage("Failed to load accommodations details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (slug) fetchAccommodation();
//   }, [slug]);

//   return (
//     <section className="flex p-4 sm:p-8 items-center justify-center text-neutral-600">
//       <div className="flex flex-col gap-8 sm:gap-16 w-full max-w-6xl">
//         <div className="relative w-screen h-96 sm:h-[560px] -mt-36 sm:-mt-48 rounded-b-[32px] sm:rounded-b-[64px] left-1/2 -translate-x-1/2 overflow-hidden">
//           <Image
//             fill
//             src="/Images/hero-banner-1.png"
//             alt="Gold Coast Morib International Resort Booking Hero Banner"
//             className="object-cover object-center"
//           />
//           <div className="absolute inset-0 bg-black/15" />
//           <div className="absolute inset-0 flex flex-col gap-4 pb-24 items-center justify-end text-white">
//             <h1 className="text-lg sm:text-xl">Your Getaway Starts Here</h1>
//             <p
//               className={`block leading-none text-[40px] sm:text-[72px] text-center ${cormorantGaramond.className}`}
//             >
//               Your Perfect Dates <br />
//               Unforgettable Funs
//             </p>
//           </div>
//         </div>

//         <div>Booking</div>
//       </div>
//     </section>
//   );
// }
