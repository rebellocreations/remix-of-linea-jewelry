import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Leaf, ShieldCheck, Video } from "lucide-react";
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
                        <div className="flex items-center gap-2 text-sm">
                            <ShieldCheck className="w-4 h-4 text-stone-400" />
                            <span>{returnPolicyConfig.returnWindowText}</span>
                        </div>

                        {/* Mandatory Video Warning */}
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-3">
                            <div className="flex items-center gap-2 mb-2 text-amber-800 font-medium">
                                <Video size={18} />
                                <span>{returnPolicyConfig.mandatoryVideoProof.warningText}</span>
                            </div>
                            <p className="text-sm text-amber-900/80 mb-2">
                                {returnPolicyConfig.mandatoryVideoProof.description}
                            </p>
                            <div className="text-xs font-bold text-amber-700 flex items-center gap-1.5 uppercase tracking-wide">
                                <AlertTriangle size={12} />
                                {returnPolicyConfig.mandatoryVideoProof.consequence}
                            </div>
                        </div>

                        <div className="text-xs text-stone-400 pt-2 border-t border-dashed border-stone-200">
                            *{returnPolicyConfig.conditionText}. {returnPolicyConfig.returnFeeText}.
                        </div>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    );
};

export default ProductAccordion;
