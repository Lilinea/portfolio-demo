import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    Search,
    MapPin,
    CalendarDays,
    ArrowRight,
    ShieldCheck,
    Lock,
    Headphones,
    Star,
    X,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Check,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../Components/ui/dialog';

const providers = [
    {
        name: 'Luna Morgan',
        role: 'Makeup Artist',
        location: 'Downtown',
        price: '$200',
        availability: 'Available Now',
        rating: '4.9',
        reviews: '120',
        description:
            'Professional makeup artist with 6+ years of experience specializing in bridal, event, and photoshoot makeup.',
        services: ['Bridal Makeup', 'Event Makeup', 'Photoshoot', 'Party Makeup', 'Makeup Lessons'],
        experience: '6+ years',
        responseTime: 'Usually within 1 hour',
        languages: 'English, Spanish',
        availabilityWindow: 'Mon–Sat, 10:00 AM – 7:00 PM',
    },
    {
        name: 'Bella Rossi',
        role: 'Hair Stylist',
        location: 'Langford',
        price: '$180',
        availability: 'Available Now',
        rating: '4.8',
        reviews: '98',
        description:
            'Experienced hair stylist offering cuts, styling, and event-ready hair looks for a wide range of clients.',
        services: ['Hair Styling', 'Blowout', 'Event Hair', 'Hair Consultation'],
        experience: '5+ years',
        responseTime: 'Usually within 2 hours',
        languages: 'English, Italian',
        availabilityWindow: 'Tue–Sun, 9:00 AM – 6:00 PM',
    },
    {
        name: 'Mia Carter',
        role: 'Photographer',
        location: 'Uptown',
        price: '$220',
        availability: 'Available Now',
        rating: '4.9',
        reviews: '150',
        description:
            'Creative photographer specializing in portraits, personal branding, and lifestyle sessions.',
        services: ['Portraits', 'Branding', 'Lifestyle', 'Events'],
        experience: '7+ years',
        responseTime: 'Usually within 3 hours',
        languages: 'English',
        availabilityWindow: 'Mon–Fri, 11:00 AM – 8:00 PM',
    },
    {
        name: 'Sasha Wilson',
        role: 'Nail Technician',
        location: 'Downtown',
        price: '$200',
        availability: 'Available Now',
        rating: '4.7',
        reviews: '76',
        description:
            'Skilled nail technician providing clean, modern nail care and custom nail design services.',
        services: ['Gel Nails', 'Nail Art', 'Manicure', 'Pedicure'],
        experience: '4+ years',
        responseTime: 'Usually within 1 hour',
        languages: 'English, French',
        availabilityWindow: 'Wed–Mon, 10:30 AM – 7:30 PM',
    },
];

const steps = [
    {
        title: 'Browse',
        text: 'Explore verified providers and their services.',
        icon: Search,
    },
    {
        title: 'Choose Date',
        text: 'Pick the day that works best for your schedule.',
        icon: CalendarDays,
    },
    {
        title: 'Book',
        text: 'Confirm your booking securely.',
        icon: Lock,
    },
    {
        title: 'Enjoy',
        text: 'Have a great experience and leave a review.',
        icon: ShieldCheck,
    },
];

const trustItems = [
    {
        title: 'Verified Providers',
        text: 'All providers are verified for your safety.',
        icon: ShieldCheck,
    },
    {
        title: 'Secure Booking',
        text: 'Your data and payments are protected.',
        icon: Lock,
    },
    {
        title: '24/7 Support',
        text: 'We’re here to help whenever you need us.',
        icon: Headphones,
    },
    {
        title: 'Top Experience',
        text: 'Quality service and satisfaction come first.',
        icon: Star,
    },
];

const serviceOptions = [
    'Any Service',
    'Makeup Artist',
    'Hair Stylist',
    'Photographer',
    'Nail Technician'
];

const locationOptions = [
    'Any Location', 
    'Downtown', 
    'Langford', 
    'Uptown'
];

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export default function Welcome() {
    const [selectedProvider, setSelectedProvider] = useState<(typeof providers)[number] | null>(null);

    const [serviceFilter, setServiceFilter] = useState('Any Service');
    const [locationFilter, setLocationFilter] = useState('Any Location');
    const [dateFilter, setDateFilter] = useState('');

    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isDateOpen, setIsDateOpen] = useState(false);

    const today = new Date();
    const [displayMonth, setDisplayMonth] = useState(today.getMonth());
    const [displayYear, setDisplayYear] = useState(today.getFullYear());
    const [calendarView, setCalendarView] = useState<'days' | 'months'>('days');

    const filteredProviders = useMemo(() => {
        return providers.filter((provider) => {
            const matchesService =
                serviceFilter === 'Any Service' ||
                provider.role === serviceFilter ||
                provider.services.includes(serviceFilter);

            const matchesLocation =
                locationFilter === 'Any Location' || provider.location === locationFilter;

            const matchesDate = !dateFilter || true;

            return matchesService && matchesLocation && matchesDate;
        });
    }, [serviceFilter, locationFilter, dateFilter]);

    const resetFilters = () => {
        setServiceFilter('Any Service');
        setLocationFilter('Any Location');
        setDateFilter('');
        setIsServiceOpen(false);
        setIsLocationOpen(false);
        setIsDateOpen(false);
        setCalendarView('days');
        setDisplayMonth(today.getMonth());
        setDisplayYear(today.getFullYear());
    };

    const formattedDate = dateFilter
        ? new Date(dateFilter).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          })
        : 'Any Date';

    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const pickDate = (day: number) => {
        const month = String(displayMonth + 1).padStart(2, '0');
        const date = String(day).padStart(2, '0');
        setDateFilter(`${displayYear}-${month}-${date}`);
        setIsDateOpen(false);
        setCalendarView('days');
    };

    const goToPrevMonth = () => {
        if (displayMonth === 0) {
            setDisplayMonth(11);
            setDisplayYear((prev) => prev - 1);
        } else {
            setDisplayMonth((prev) => prev - 1);
        }
    };

    const goToNextMonth = () => {
        if (displayMonth === 11) {
            setDisplayMonth(0);
            setDisplayYear((prev) => prev + 1);
        } else {
            setDisplayMonth((prev) => prev + 1);
        }
    };

    const toggleDateOpen = () => {
        setIsDateOpen((prev) => !prev);
        setIsServiceOpen(false);
        setIsLocationOpen(false);
    };

    const toggleServiceOpen = () => {
        setIsServiceOpen((prev) => !prev);
        setIsLocationOpen(false);
        setIsDateOpen(false);
    };

    const toggleLocationOpen = () => {
        setIsLocationOpen((prev) => !prev);
        setIsServiceOpen(false);
        setIsDateOpen(false);
    };

    return (
        <>
            <Head title="Booking" />

            <div className="min-h-screen bg-[#f8f6f4] text-[#1b1b18]">
                <section className="relative overflow-hidden bg-[#160f0d] text-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#160f0d] via-[#160f0de6] to-[#160f0d66]" />

                    <div className="relative mx-auto max-w-7xl px-6 pt-6 pb-28 lg:px-10 lg:pt-8 lg:pb-36">
                        <header className="flex items-center justify-between gap-4">
                            <div className="text-3xl font-semibold tracking-tight">
                                Website<span className="text-[#f56f7f]">Name</span>
                            </div>

                            <nav className="hidden items-center gap-10 text-sm text-white/90 md:flex">
                                <a href="#" className="border-b-2 border-[#f56f7f] pb-1">
                                    Home
                                </a>
                                <a href="#" className="hover:text-white">
                                    Explore
                                </a>
                                <a href="#" className="hover:text-white">
                                    How It Works
                                </a>
                                <a href="#" className="hover:text-white">
                                    About Us
                                </a>
                                <a href="#" className="hover:text-white">
                                    Contact
                                </a>
                            </nav>

                            <button className="rounded-full bg-[#f56f7f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#ef6172]">
                                Book Now
                            </button>
                        </header>

                        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                            <div className="max-w-xl">
                                <p className="mb-4 text-sm font-medium text-[#f3a1ae]">Trusted by thousands</p>

                                <h1 className="text-5xl leading-tight font-semibold tracking-tight sm:text-6xl">
                                    Book the perfect
                                    <span className="block text-[#f56f7f]">experience</span>
                                </h1>

                                <p className="mt-6 max-w-md text-lg leading-8 text-white/80">
                                    Browse trusted providers, check availability, and book with ease.
                                </p>

                                <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f56f7f] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#ef6172]">
                                    Browse Providers
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex justify-center lg:justify-end">
                                <div className="h-[430px] w-full max-w-[440px] rounded-[28px] border border-white/10 bg-white/8 shadow-2xl backdrop-blur-sm">
                                    <div className="flex h-full items-center justify-center rounded-[28px] border-2 border-dashed border-white/20 text-center text-sm text-white/55">
                                        Header image placeholder
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-b from-transparent to-[#f8f6f4]" />
                </section>

                <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-6 lg:px-10">
                    <div className="grid gap-4 rounded-[24px] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:grid-cols-2 xl:grid-cols-4 md:p-5">
                        {/* Service Type */}
                        <div className="relative rounded-[20px] border border-[#efe7e1] bg-[#fcfbfa] px-4 py-3">
                            <label className="mb-2 block text-xs font-medium text-[#8b8682]">
                                Service Type
                            </label>

                            <button
                                type="button"
                                onClick={toggleServiceOpen}
                                className="flex w-full items-center justify-between text-left text-sm font-medium text-[#1b1b18]"
                            >
                                <span>{serviceFilter}</span>
                                <span className="text-[#8b8682]">▾</span>
                            </button>

                            {isServiceOpen && (
                                <div className="absolute left-0 top-[calc(100%+10px)] z-30 max-h-[320px] w-full overflow-y-auto rounded-[20px] border border-[#efe7e1] bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                                    {serviceOptions.map((option) => {
                                        const isSelected = serviceFilter === option;

                                        return (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => {
                                                    setServiceFilter(option);
                                                    setIsServiceOpen(false);
                                                }}
                                                className={`flex w-full items-center justify-between rounded-[14px] px-3 py-3 text-sm transition ${
                                                    isSelected
                                                        ? 'bg-[#f8f1f3] text-[#f56f7f]'
                                                        : 'text-[#1b1b18] hover:bg-[#fcf7f8]'
                                                }`}
                                            >
                                                <span>{option}</span>
                                                {isSelected ? <Check className="h-4 w-4" /> : null}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Location */}
                        <div className="relative rounded-[20px] border border-[#efe7e1] bg-[#fcfbfa] px-4 py-3">
                            <label className="mb-2 block text-xs font-medium text-[#8b8682]">
                                Location
                            </label>

                            <button
                                type="button"
                                onClick={toggleLocationOpen}
                                className="flex w-full items-center justify-between text-left text-sm font-medium text-[#1b1b18]"
                            >
                                <span>{locationFilter}</span>
                                <span className="text-[#8b8682]">▾</span>
                            </button>

                            {isLocationOpen && (
                                <div className="absolute left-0 top-[calc(100%+10px)] z-30 w-full rounded-[20px] border border-[#efe7e1] bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                                    {locationOptions.map((option) => {
                                        const isSelected = locationFilter === option;

                                        return (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => {
                                                    setLocationFilter(option);
                                                    setIsLocationOpen(false);
                                                }}
                                                className={`flex w-full items-center justify-between rounded-[14px] px-3 py-3 text-sm transition ${
                                                    isSelected
                                                        ? 'bg-[#f8f1f3] text-[#f56f7f]'
                                                        : 'text-[#1b1b18] hover:bg-[#fcf7f8]'
                                                }`}
                                            >
                                                <span>{option}</span>
                                                {isSelected ? <Check className="h-4 w-4" /> : null}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Date */}
                        <div className="relative rounded-[20px] border border-[#efe7e1] bg-[#fcfbfa] px-4 py-3">
                            <label className="mb-2 block text-xs font-medium text-[#8b8682]">
                                Date
                            </label>

                            <button
                                type="button"
                                onClick={toggleDateOpen}
                                className="flex w-full items-center justify-between text-left text-sm font-medium text-[#1b1b18]"
                            >
                                <span className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-[#8b8682]" />
                                    {formattedDate}
                                </span>
                                <span className="text-[#8b8682]">▾</span>
                            </button>

                            {isDateOpen && (
                                <div className="absolute left-0 top-[calc(100%+10px)] z-30 w-[310px] rounded-[20px] border border-[#efe7e1] bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={goToPrevMonth}
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-[#8b8682] transition hover:bg-[#f8f1f3] hover:text-[#1b1b18]"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setCalendarView((prev) =>
                                                        prev === 'days' ? 'months' : 'days',
                                                    )
                                                }
                                                className="rounded-full px-3 py-1 text-sm font-semibold text-[#1b1b18] transition hover:bg-[#f8f1f3]"
                                            >
                                                {monthNames[displayMonth]} {displayYear}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={goToNextMonth}
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-[#8b8682] transition hover:bg-[#f8f1f3] hover:text-[#1b1b18]"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsDateOpen(false);
                                                setCalendarView('days');
                                            }}
                                            className="text-sm text-[#8b8682] hover:text-[#1b1b18]"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {calendarView === 'days' ? (
                                        <>
                                            <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-[#8b8682]">
                                                <span>Su</span>
                                                <span>Mo</span>
                                                <span>Tu</span>
                                                <span>We</span>
                                                <span>Th</span>
                                                <span>Fr</span>
                                                <span>Sa</span>
                                            </div>

                                            <div className="grid grid-cols-7 gap-2 text-center">
                                                {emptyDays.map((day) => (
                                                    <div key={`empty-${day}`} />
                                                ))}

                                                {Array.from({ length: daysInMonth }, (_, i) => {
                                                    const day = i + 1;
                                                    const month = String(displayMonth + 1).padStart(2, '0');
                                                    const date = String(day).padStart(2, '0');
                                                    const value = `${displayYear}-${month}-${date}`;
                                                    const isSelected = dateFilter === value;

                                                    return (
                                                        <button
                                                            key={value}
                                                            type="button"
                                                            onClick={() => pickDate(day)}
                                                            className={`h-9 rounded-full text-sm transition ${
                                                                isSelected
                                                                    ? 'bg-[#f56f7f] text-white'
                                                                    : 'text-[#1b1b18] hover:bg-[#f8f1f3]'
                                                            }`}
                                                        >
                                                            {day}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-2">
                                            {monthNames.map((month, index) => {
                                                const isCurrent = displayMonth === index;

                                                return (
                                                    <button
                                                        key={month}
                                                        type="button"
                                                        onClick={() => {
                                                            setDisplayMonth(index);
                                                            setCalendarView('days');
                                                        }}
                                                        className={`rounded-[14px] px-3 py-3 text-sm transition ${
                                                            isCurrent
                                                                ? 'bg-[#f56f7f] text-white'
                                                                : 'text-[#1b1b18] hover:bg-[#f8f1f3]'
                                                        }`}
                                                    >
                                                        {month.slice(0, 3)}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end">
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="rounded-full bg-[#f8f1f3] px-5 py-4 text-sm font-medium text-[#f56f7f] transition hover:bg-[#fbe7eb]"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
                    <section>
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-4xl font-semibold tracking-tight">Featured Providers</h2>
                            <a href="#" className="text-sm font-medium text-[#f56f7f] hover:underline">
                                View all providers
                            </a>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {filteredProviders.map((provider) => (
                                <article
                                    key={provider.name}
                                    onClick={() => setSelectedProvider(provider)}
                                    className="cursor-pointer overflow-hidden rounded-[22px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
                                >
                                    <div className="relative h-64 bg-[#e9e4df]">
                                        <div className="absolute top-4 left-4 rounded-full bg-[#0f8a4d] px-3 py-1 text-xs font-medium text-white">
                                            {provider.availability}
                                        </div>
                                        <div className="flex h-full items-center justify-center border-2 border-dashed border-[#d8d0c8] text-sm text-[#8b8682]">
                                            Card image placeholder
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-semibold">{provider.name}</h3>
                                                <p className="mt-1 text-sm text-[#6f6a66]">{provider.role}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-semibold text-[#f56f7f]">{provider.price}</div>
                                                <div className="text-sm text-[#9d9893]">/hr</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2 text-sm text-[#6f6a66]">
                                            <MapPin className="h-4 w-4" />
                                            {provider.location}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {filteredProviders.length === 0 && (
                            <div className="mt-8 rounded-[22px] bg-white p-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                                <h3 className="text-2xl font-semibold">No providers found</h3>
                                <p className="mt-3 text-sm text-[#6f6a66]">
                                    Try changing the service or location filters.
                                </p>
                            </div>
                        )}
                    </section>

                    <section className="py-20">
                        <h2 className="text-center text-4xl font-semibold tracking-tight">How It Works</h2>

                        <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
                            {steps.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    <div key={step.title} className="text-center">
                                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fde8ec] text-[#f56f7f]">
                                            <Icon className="h-8 w-8" />
                                        </div>
                                        <h3 className="mt-6 text-2xl font-semibold">
                                            {index + 1}. {step.title}
                                        </h3>
                                        <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#6f6a66]">
                                            {step.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="rounded-[28px] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                            {trustItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.title} className="flex gap-4">
                                        <div className="mt-1 text-[#f56f7f]">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p className="mt-2 text-sm leading-7 text-[#6f6a66]">{item.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </main>

                <Dialog open={!!selectedProvider} onOpenChange={(open) => !open && setSelectedProvider(null)}>
                    <DialogContent className="!w-[96vw] !max-w-[1280px] h-[92vh] md:h-[88vh] overflow-hidden border-0 bg-white p-0">
                        {selectedProvider && (
                            <div className="grid h-full min-h-0 grid-cols-1 md:grid-cols-[1.15fr_0.85fr]">
                                <div className="flex min-h-0 flex-col bg-[#f3ede8] md:h-full">
                                    <div className="relative flex min-h-[320px] flex-1 items-center justify-center border-b border-[#e8dfd8] px-4 py-4 md:min-h-0 md:px-8 md:py-8">
                                        <button
                                            type="button"
                                            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>

                                        <button
                                            type="button"
                                            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>

                                        <div className="flex h-full max-h-[520px] w-full items-center justify-center rounded-[20px] border-2 border-dashed border-[#d8d0c8] text-sm text-[#8b8682]">
                                            Large image placeholder
                                        </div>
                                    </div>

                                    <div className="shrink-0 border-t border-[#e8dfd8] px-4 py-4 md:px-6">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-[#d8d0c8] text-[11px] text-[#8b8682]">
                                                Img
                                            </div>
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-[#d8d0c8] text-[11px] text-[#8b8682]">
                                                Img
                                            </div>
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-[#d8d0c8] text-[11px] text-[#8b8682]">
                                                Img
                                            </div>
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-[#d8d0c8] text-[11px] text-[#8b8682]">
                                                Img
                                            </div>
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#4f4a46] text-sm font-medium text-white">
                                                +2
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex min-h-0 min-w-0 flex-col overflow-hidden md:h-full">
                                    <div className="min-h-0 flex-1 overflow-y-auto">
                                        <div className="flex min-h-full flex-col p-5 md:p-8">
                                            <div className="mb-4 flex min-w-0 items-start justify-between gap-4">
                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-3 inline-flex rounded-full bg-[#eef8f0] px-3 py-1 text-xs font-medium text-[#0f8a4d]">
                                                        {selectedProvider.availability}
                                                    </div>

                                                    <DialogTitle className="text-4xl leading-tight font-semibold tracking-tight text-[#1b1b18]">
                                                        {selectedProvider.name}
                                                    </DialogTitle>

                                                    <p className="mt-2 text-lg text-[#6f6a66]">{selectedProvider.role}</p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedProvider(null)}
                                                    className="rounded-full p-2 text-[#6f6a66] transition hover:bg-[#f3f0ec]"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>

                                            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-[#6f6a66]">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-[#f5b301] text-[#f5b301]" />
                                                    {selectedProvider.rating} ({selectedProvider.reviews} reviews)
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {selectedProvider.location}
                                                </div>
                                            </div>

                                            <div className="mb-6 flex items-center gap-2 rounded-[18px] border border-[#efe7e1] bg-[#fcfbfa] px-4 py-3 text-sm text-[#4e4945]">
                                                <Clock3 className="h-4 w-4 text-[#8b8682]" />
                                                <span className="font-medium">Availability:</span>
                                                <span>{selectedProvider.availabilityWindow}</span>
                                            </div>

                                            <p className="mb-8 text-sm leading-7 text-[#4e4945]">
                                                {selectedProvider.description}
                                            </p>

                                            <div className="mb-8">
                                                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#1b1b18]">
                                                    Services
                                                </h3>

                                                <div className="flex flex-wrap gap-3">
                                                    {selectedProvider.services.map((service) => (
                                                        <span
                                                            key={service}
                                                            className="rounded-full bg-[#f5f3f1] px-4 py-2 text-sm text-[#4e4945]"
                                                        >
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid gap-4 border-t border-[#ebe6e2] pt-6 text-sm text-[#4e4945]">
                                                <div className="flex justify-between gap-6">
                                                    <span className="text-[#6f6a66]">Response Time</span>
                                                    <span>{selectedProvider.responseTime}</span>
                                                </div>

                                                <div className="flex justify-between gap-6">
                                                    <span className="text-[#6f6a66]">Languages</span>
                                                    <span>{selectedProvider.languages}</span>
                                                </div>

                                                <div className="flex justify-between gap-6">
                                                    <span className="text-[#6f6a66]">Rating</span>
                                                    <span>
                                                        {selectedProvider.rating} ({selectedProvider.reviews} reviews)
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="h-6 shrink-0" />
                                        </div>
                                    </div>

                                    <div className="shrink-0 border-t border-[#ebe6e2] bg-white px-5 py-5 md:px-8 md:py-6">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <span className="text-4xl font-semibold text-[#f56f7f]">
                                                    {selectedProvider.price}
                                                </span>
                                                <span className="ml-1 text-sm text-[#9d9893]">/hr</span>
                                            </div>

                                            <button className="rounded-xl bg-[#f56f7f] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#ef6172]">
                                                Check Availability
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
