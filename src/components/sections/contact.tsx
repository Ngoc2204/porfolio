"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto py-20">
      <SectionHeader id="contact" className="mb-14" title="Cùng hợp tác" />
      <div className="relative z-10 ml-0 mr-auto w-full max-w-[min(100%,42rem)] px-4 md:px-8">
        <Card className="w-full min-w-0 border-border bg-card text-card-foreground shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-4xl">Liên hệ</CardTitle>
            <CardDescription>
              Liên hệ trực tiếp qua{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="break-all font-medium text-foreground underline underline-offset-4 cursor-can-hover rounded-lg"
              >
                {config.email}
              </a>{" "}
              hoặc điện thoại <a href={`tel:${config.phone}`} className="underline">{config.phoneLabel}</a>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
