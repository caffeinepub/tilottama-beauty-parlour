import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Clock,
  Droplets,
  Facebook,
  Feather,
  Hand,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitAppointment } from "./hooks/useQueries";

const SERVICES = [
  {
    icon: Scissors,
    title: "Haircuts & Styling",
    desc: "Cut, color & styles to suit your personality",
  },
  {
    icon: Sparkles,
    title: "Facials & Skincare",
    desc: "Revitalize your skin with our expert treatments",
  },
  {
    icon: Heart,
    title: "Bridal Makeup",
    desc: "Look stunning on your most special day",
  },
  {
    icon: Feather,
    title: "Waxing & Threading",
    desc: "Smooth and precise hair removal services",
  },
  {
    icon: Hand,
    title: "Manicure & Pedicure",
    desc: "Pamper your hands and feet to perfection",
  },
  {
    icon: Droplets,
    title: "Hair Treatments",
    desc: "Deep conditioning and repair treatments",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    rating: 4,
    text: "Nice salon, value for money, quality service. The staff is very friendly and professional.",
    initials: "PS",
  },
  {
    name: "Ananya Das",
    rating: 4,
    text: "Overall a great place, reasonably priced and cooperative staff. Will definitely visit again!",
    initials: "AD",
  },
  {
    name: "Meghna Roy",
    rating: 5,
    text: "Excellent service and very talented staff. My bridal makeup was absolutely stunning. Highly recommend!",
    initials: "MR",
  },
];

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const STATS = [
  ["500+", "Happy Clients"],
  ["10+", "Years Experience"],
  ["20+", "Services"],
];

const HIGHLIGHTS = [
  ["✦", "Affordable Pricing"],
  ["✦", "Quality Products"],
  ["✦", "Experienced Staff"],
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].slice(0, max).map((n) => (
        <Star
          key={n}
          className="w-4 h-4"
          style={{
            fill: n <= rating ? "var(--gold)" : "none",
            color: "var(--gold)",
          }}
        />
      ))}
    </div>
  );
}

function useFadeInUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useFadeInUp();
  return (
    <div
      ref={ref}
      className={`fade-in-up ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    customerName: "",
    service: "",
    preferredDate: "",
    phoneNumber: "",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const submitAppointment = useSubmitAppointment();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !appointmentForm.customerName ||
      !appointmentForm.service ||
      !appointmentForm.phoneNumber
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitAppointment.mutateAsync({
        customerName: appointmentForm.customerName,
        service: appointmentForm.service,
        preferredDate: appointmentForm.preferredDate,
        phoneNumber: appointmentForm.phoneNumber,
        timestamp: BigInt(Date.now()),
      });
      toast.success("Appointment booked! We'll confirm shortly.");
      setAppointmentForm({
        customerName: "",
        service: "",
        preferredDate: "",
        phoneNumber: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-lato">
      <Toaster position="top-right" />

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 bg-white border-b border-border shadow-sm"
        style={{ height: "78px" }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex flex-col leading-none"
            data-ocid="nav.link"
          >
            <span
              className="font-script text-3xl"
              style={{ color: "var(--gold-dark)" }}
            >
              Tilottama
            </span>
            <span
              className="font-lato text-xs tracking-widest uppercase text-muted-foreground"
              style={{ letterSpacing: "0.18em" }}
            >
              Beauty Parlour
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-lato text-sm text-foreground hover:text-primary transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("booking")}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--cta-blush)" }}
              data-ocid="nav.primary_button"
            >
              BOOK NOW
            </button>
          </nav>
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-ocid="nav.toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg py-4 px-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left font-lato text-sm text-foreground py-2 border-b border-border last:border-0"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("booking")}
              className="mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ background: "var(--cta-blush)" }}
              data-ocid="nav.primary_button"
            >
              BOOK NOW
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden"
        style={{ minHeight: "600px" }}
      >
        <img
          src="/assets/generated/hero-salon.dim_1400x700.jpg"
          alt="Tilottama Beauty Parlour"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.92) 45%, rgba(255,255,255,0.25) 100%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 flex items-center">
          <div className="max-w-lg">
            <FadeSection delay={0}>
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ color: "var(--cta-blush)" }}
              >
                Welcome to Tilottama
              </p>
            </FadeSection>
            <FadeSection delay={100}>
              <h1
                className="font-playfair text-5xl md:text-6xl font-bold leading-tight mb-5"
                style={{ color: "var(--gold-dark)" }}
              >
                Enhancing Your
                <br />
                <em>Natural Beauty</em>
              </h1>
            </FadeSection>
            <FadeSection delay={200}>
              <p className="font-lato text-lg text-muted-foreground mb-8 leading-relaxed">
                Discover premium beauty and wellness services tailored just for
                you. Affordable pricing, quality care, experienced staff.
              </p>
            </FadeSection>
            <FadeSection delay={300}>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => scrollTo("booking")}
                  className="px-7 py-3 rounded-lg font-semibold text-white shadow-md transition-transform hover:scale-105"
                  style={{ background: "var(--gold-dark)" }}
                  data-ocid="hero.primary_button"
                >
                  Book Appointment
                </button>
                <a
                  href="tel:+917890014244"
                  className="px-7 py-3 rounded-lg font-semibold border-2 transition-transform hover:scale-105 flex items-center gap-2"
                  style={{
                    borderColor: "var(--cta-blush)",
                    color: "var(--cta-blush)",
                  }}
                  data-ocid="hero.secondary_button"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </FadeSection>
            <FadeSection delay={400}>
              <div className="flex gap-8 mt-10">
                {STATS.map(([num, label]) => (
                  <div key={label} className="text-center">
                    <div
                      className="font-playfair text-2xl font-bold"
                      style={{ color: "var(--gold-dark)" }}
                    >
                      {num}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FadeSection>
            <div className="text-center mb-14">
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-2"
                style={{ color: "var(--cta-blush)" }}
              >
                What We Offer
              </p>
              <h2 className="font-playfair text-4xl font-bold text-foreground">
                Our Services
              </h2>
              <div
                className="mx-auto mt-4 w-16 h-0.5"
                style={{ background: "var(--gold)" }}
              />
            </div>
          </FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((svc, i) => (
              <FadeSection key={svc.title} delay={i * 80} className="h-full">
                <div
                  className="h-full bg-white rounded-xl p-7 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-gold cursor-default"
                  style={{
                    border: "1.5px solid var(--gold)",
                    boxShadow: "0 4px 18px 0 oklch(0.72 0.065 15 / 0.08)",
                  }}
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                    style={{
                      background: "var(--blush-light)",
                      border: "1.5px solid var(--gold)",
                    }}
                  >
                    <svc.icon
                      className="w-6 h-6"
                      style={{ color: "var(--gold-dark)" }}
                    />
                  </div>
                  <h3 className="font-playfair text-lg font-semibold mb-2 text-foreground">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-blush-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeSection>
              <div>
                <p
                  className="text-sm font-semibold tracking-widest uppercase mb-3"
                  style={{ color: "var(--cta-blush)" }}
                >
                  Our Story
                </p>
                <h2 className="font-playfair text-4xl font-bold mb-6 text-foreground">
                  About Tilottama
                  <br />
                  <em className="text-3xl">Beauty Parlour</em>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  Nestled in the heart of Bidhannagar, Kolkata, Tilottama Beauty
                  Parlour has been a trusted name in beauty and wellness for
                  over a decade. Founded with a passion for enhancing natural
                  beauty, we pride ourselves on delivering premium services at
                  affordable prices.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  Our team of experienced and talented beauticians is dedicated
                  to making every visit a luxurious, personalized experience.
                  From everyday grooming to grand bridal transformations, we
                  handle it all with care and artistry.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We believe every woman deserves to feel beautiful. Step into
                  our warm, welcoming space and let us take care of you.
                </p>
                <div className="flex flex-wrap gap-6">
                  {HIGHLIGHTS.map(([sym, label]) => (
                    <div key={label} className="flex items-center gap-2">
                      <span style={{ color: "var(--gold)" }}>{sym}</span>
                      <span className="text-sm font-medium text-foreground">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>
            <FadeSection delay={150}>
              <div className="relative">
                <img
                  src="/assets/generated/about-salon.dim_600x500.jpg"
                  alt="Tilottama Beauty Parlour interior"
                  className="w-full rounded-2xl object-cover shadow-lg"
                  style={{ maxHeight: "480px" }}
                />
                <div
                  className="absolute -bottom-5 -left-5 rounded-xl px-6 py-4 shadow-lg"
                  style={{ background: "var(--blush-footer)" }}
                >
                  <div className="font-playfair text-2xl font-bold text-white">
                    3.9★
                  </div>
                  <div className="text-xs text-white opacity-90">
                    Average Rating
                  </div>
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 bg-blush-mid">
        <div className="max-w-7xl mx-auto px-4">
          <FadeSection>
            <div className="text-center mb-14">
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-2"
                style={{ color: "var(--cta-blush)" }}
              >
                Kind Words
              </p>
              <h2 className="font-playfair text-4xl font-bold text-foreground">
                What Our Clients Say
              </h2>
              <div
                className="mx-auto mt-4 w-16 h-0.5"
                style={{ background: "var(--gold)" }}
              />
              <div className="mt-4 flex items-center justify-center gap-2">
                <StarRating rating={4} />
                <span className="font-semibold text-foreground">3.9</span>
                <span className="text-muted-foreground text-sm">
                  overall rating
                </span>
              </div>
            </div>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {TESTIMONIALS.map((t, i) => (
              <FadeSection key={t.name} delay={i * 100}>
                <div
                  className="rounded-xl p-7 h-full flex flex-col gap-4"
                  style={{ background: "oklch(0.96 0.018 15)" }}
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <StarRating rating={t.rating} />
                  <p className="text-foreground leading-relaxed flex-1 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "var(--cta-blush)" }}
                    >
                      {t.initials}
                    </div>
                    <span className="font-semibold text-foreground text-sm">
                      {t.name}
                    </span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <FadeSection>
            <div className="text-center mb-10">
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-2"
                style={{ color: "var(--cta-blush)" }}
              >
                Reserve Your Spot
              </p>
              <h2 className="font-playfair text-4xl font-bold text-foreground">
                Book an Appointment
              </h2>
              <div
                className="mx-auto mt-4 w-16 h-0.5"
                style={{ background: "var(--gold)" }}
              />
            </div>
          </FadeSection>
          <FadeSection delay={100}>
            <form
              onSubmit={handleAppointmentSubmit}
              className="rounded-2xl p-8 shadow-lg"
              style={{
                border: "1.5px solid var(--gold)",
                background: "oklch(1 0 0)",
              }}
              data-ocid="booking.panel"
            >
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Label
                    htmlFor="booking-name"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="booking-name"
                    placeholder="Your name"
                    value={appointmentForm.customerName}
                    onChange={(e) =>
                      setAppointmentForm((p) => ({
                        ...p,
                        customerName: e.target.value,
                      }))
                    }
                    data-ocid="booking.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="booking-service"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Service *
                  </Label>
                  <Select
                    value={appointmentForm.service}
                    onValueChange={(val) =>
                      setAppointmentForm((p) => ({ ...p, service: val }))
                    }
                  >
                    <SelectTrigger
                      id="booking-service"
                      data-ocid="booking.select"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((s) => (
                        <SelectItem key={s.title} value={s.title}>
                          {s.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="booking-date"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Preferred Date
                  </Label>
                  <Input
                    id="booking-date"
                    type="date"
                    value={appointmentForm.preferredDate}
                    onChange={(e) =>
                      setAppointmentForm((p) => ({
                        ...p,
                        preferredDate: e.target.value,
                      }))
                    }
                    data-ocid="booking.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="booking-phone"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="booking-phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={appointmentForm.phoneNumber}
                    onChange={(e) =>
                      setAppointmentForm((p) => ({
                        ...p,
                        phoneNumber: e.target.value,
                      }))
                    }
                    data-ocid="booking.input"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitAppointment.isPending}
                  className="w-full py-3 text-white font-semibold rounded-lg mt-2"
                  style={{ background: "var(--gold-dark)", border: "none" }}
                  data-ocid="booking.submit_button"
                >
                  {submitAppointment.isPending
                    ? "Booking..."
                    : "Book Appointment"}
                </Button>
              </div>
            </form>
          </FadeSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-blush-light">
        <div className="max-w-7xl mx-auto px-4">
          <FadeSection>
            <div className="text-center mb-14">
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-2"
                style={{ color: "var(--cta-blush)" }}
              >
                Get In Touch
              </p>
              <h2 className="font-playfair text-4xl font-bold text-foreground">
                Contact Us
              </h2>
              <div
                className="mx-auto mt-4 w-16 h-0.5"
                style={{ background: "var(--gold)" }}
              />
            </div>
          </FadeSection>
          <div className="grid md:grid-cols-2 gap-10">
            <FadeSection>
              <div className="space-y-7">
                <div className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "var(--blush-mid)" }}
                  >
                    <MapPin
                      className="w-5 h-5"
                      style={{ color: "var(--cta-blush)" }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      Address
                    </div>
                    <div className="text-muted-foreground text-sm leading-relaxed">
                      Block-A, IA-289, IA Block, Sector 3,
                      <br />
                      Bidhannagar, Kolkata, West Bengal 700097, India
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "var(--blush-mid)" }}
                  >
                    <Phone
                      className="w-5 h-5"
                      style={{ color: "var(--cta-blush)" }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      Phone
                    </div>
                    <a
                      href="tel:+917890014244"
                      className="text-primary hover:underline text-sm"
                      data-ocid="contact.link"
                    >
                      +91 78900 14244
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "var(--blush-mid)" }}
                  >
                    <Clock
                      className="w-5 h-5"
                      style={{ color: "var(--cta-blush)" }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      Business Hours
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Open Daily &mdash; Closes at <strong>8:00 PM</strong>
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-xl overflow-hidden shadow-md"
                  style={{ height: "240px" }}
                >
                  <iframe
                    title="Tilottama Beauty Parlour Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.597!2d88.4205!3d22.5739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a2c9a8b7e7%3A0x0!2sBidhannagar%2C+Kolkata%2C+West+Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="240"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </FadeSection>
            <FadeSection delay={150}>
              <form
                onSubmit={handleContactSubmit}
                className="rounded-2xl p-8 bg-white shadow-md"
                style={{ border: "1.5px solid var(--border)" }}
                data-ocid="contact.panel"
              >
                <h3 className="font-playfair text-xl font-semibold mb-6 text-foreground">
                  Send a Message
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Your Name
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Name"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="email@example.com"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, email: e.target.value }))
                      }
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="How can we help you?"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((p) => ({
                          ...p,
                          message: e.target.value,
                        }))
                      }
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-white font-semibold"
                    style={{ background: "var(--cta-blush)", border: "none" }}
                    data-ocid="contact.submit_button"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blush-footer text-white">
        <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div
              className="font-script text-4xl mb-1"
              style={{ color: "oklch(1 0 0)" }}
            >
              Tilottama
            </div>
            <div className="text-xs tracking-widest uppercase opacity-80 mb-4">
              Beauty Parlour
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Your trusted beauty destination in Bidhannagar, Kolkata.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/35 transition-colors"
                data-ocid="footer.link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/35 transition-colors"
                data-ocid="footer.link"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="text-sm opacity-80 hover:opacity-100 flex items-center gap-1.5"
                    data-ocid="footer.link"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li
                  key={s.title}
                  className="text-sm opacity-80 flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3" />
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">
              Opening Hours
            </h4>
            <p className="text-sm opacity-80 mb-1">Open Daily</p>
            <p className="text-sm opacity-80 mb-5">Closes at 8:00 PM</p>
            <h4 className="font-playfair text-lg font-semibold mb-3">
              Contact
            </h4>
            <a
              href="tel:+917890014244"
              className="text-sm opacity-80 hover:opacity-100 flex items-center gap-1.5 mb-2"
              data-ocid="footer.link"
            >
              <Phone className="w-3.5 h-3.5" /> +91 78900 14244
            </a>
            <div className="text-sm opacity-80 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>Bidhannagar, Kolkata 700097</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 py-5">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm opacity-75">
            <span>
              © {new Date().getFullYear()} Tilottama Beauty Parlour. All rights
              reserved.
            </span>
            <span>
              Built with{" "}
              <Heart className="w-3.5 h-3.5 inline text-white" fill="white" />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-100"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <a
        href="https://wa.me/917890014244"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg animate-float transition-transform hover:scale-110"
        style={{ background: "#25D366" }}
        aria-label="Chat on WhatsApp"
        data-ocid="contact.link"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
      <a
        href="tel:+917890014244"
        className="fixed bottom-5 right-5 z-50 md:hidden w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ background: "var(--cta-blush)" }}
        aria-label="Call Now"
        data-ocid="contact.link"
      >
        <Phone className="w-5 h-5 text-white" />
      </a>
    </div>
  );
}
