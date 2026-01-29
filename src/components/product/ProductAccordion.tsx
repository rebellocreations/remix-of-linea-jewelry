import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Leaf, ShieldCheck, Video, Clock, Mail } from "lucide-react";
import { returnPolicyConfig } from "@/config/returnPolicy";

interface ProductAccordionProps {
    description: string;
}

const ProductAccordion = ({ description }: ProductAccordionProps) => {
    return (
        <div className="mt-12">
            <Accordion type="single" collapsible className="w-full" defaultValue="about">

                {/* About Item */}
                <AccordionItem value="about">
                    <AccordionTrigger className="font-serif text-lg text-stone-800">About This Item</AccordionTrigger>
                    <AccordionContent className="text-stone-600 leading-relaxed font-light">
                        <div dangerouslySetInnerHTML={{ __html: description || "<p>Handcrafted with care by Rebello Creation.</p>" }} />
                    </AccordionContent>
                </AccordionItem>

                {/* Care Instructions */}
                <AccordionItem value="care">
                    <AccordionTrigger className="font-serif text-lg text-stone-800">Care Instructions</AccordionTrigger>
                    <AccordionContent className="text-stone-600 leading-relaxed font-light">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Clean with a soft, dry cloth.</li>
                            <li>Avoid using harsh chemicals or abrasives.</li>
                            <li>Handle with care to preserve the glass integrity.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                {/* Sustainability */}
                <AccordionItem value="sustainability">
                    <AccordionTrigger className="font-serif text-lg text-stone-800">Sustainability Impact</AccordionTrigger>
                    <AccordionContent className="text-stone-600 leading-relaxed font-light">
                        <div className="flex gap-4 items-start">
                            <div className="bg-olive-50 p-2 rounded-lg text-olive-700">
                                <Leaf size={20} />
                            </div>
                            <p>This product is upcycled from a discarded glass bottle, saving it from a landfill and reducing carbon emissions associated with new glass production. Handcrafted locally to support artisans.</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Return & Exchange Policy */}
                <AccordionItem value="return">
                    <AccordionTrigger className="font-serif text-lg text-stone-800">Return & Exchange Policy</AccordionTrigger>
                    <AccordionContent className="text-stone-600 leading-relaxed font-light space-y-4">
                        
                        {/* Intro */}
                        <p className="text-sm text-stone-500 italic">
                            {returnPolicyConfig.tagline}
                        </p>

                        {/* Eligibility */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
                                <ShieldCheck className="w-4 h-4 text-olive-600" />
                                <span>{returnPolicyConfig.eligibility.title}</span>
                            </div>
                            <p className="text-sm text-stone-600">{returnPolicyConfig.eligibility.description}</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                {returnPolicyConfig.eligibility.conditions.map((condition, i) => (
                                    <li key={i}>{condition}</li>
                                ))}
                            </ul>
                            <p className="text-xs text-stone-500 bg-stone-50 p-3 rounded-lg border border-stone-100">
                                <strong>Please Note:</strong> {returnPolicyConfig.eligibility.note}
                            </p>
                        </div>

                        {/* Mandatory Video Warning */}
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2 text-amber-800 font-medium">
                                <Video size={18} />
                                <span>{returnPolicyConfig.mandatoryVideoProof.title}</span>
                            </div>
                            <p className="text-sm text-amber-900/80 mb-2">
                                {returnPolicyConfig.mandatoryVideoProof.description}
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-amber-900/70 mb-3">
                                {returnPolicyConfig.mandatoryVideoProof.requirements.map((req, i) => (
                                    <li key={i}>{req}</li>
                                ))}
                            </ul>
                            <div className="text-xs font-bold text-amber-700 flex items-center gap-1.5 uppercase tracking-wide">
                                <AlertTriangle size={12} />
                                {returnPolicyConfig.mandatoryVideoProof.consequence}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
                                <Clock className="w-4 h-4 text-olive-600" />
                                <span>{returnPolicyConfig.timeline.title}</span>
                            </div>
                            <p className="text-sm text-stone-600">{returnPolicyConfig.timeline.description}</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                {returnPolicyConfig.timeline.conditions.map((condition, i) => (
                                    <li key={i}>{condition}</li>
                                ))}
                            </ul>
                        </div>

                        {/* How to Initiate */}
                        <div className="space-y-2 border-t border-stone-200 pt-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
                                <Mail className="w-4 h-4 text-olive-600" />
                                <span>{returnPolicyConfig.howToInitiate.title}</span>
                            </div>
                            <p className="text-sm text-stone-600">{returnPolicyConfig.howToInitiate.description}</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                {returnPolicyConfig.howToInitiate.requirements.map((req, i) => (
                                    <li key={i}>{req}</li>
                                ))}
                            </ul>
                            <a 
                                href={`mailto:${returnPolicyConfig.howToInitiate.email}`}
                                className="inline-block mt-2 text-sm text-olive-700 hover:text-olive-900 underline underline-offset-2"
                            >
                                {returnPolicyConfig.howToInitiate.email}
                            </a>
                        </div>

                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    );
};

export default ProductAccordion;
