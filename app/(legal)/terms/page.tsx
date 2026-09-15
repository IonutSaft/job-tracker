import type { Metadata } from "next";
import Link from "next/link";
import { BackToTopButton } from "@/components/back-to-top-button";
import { BackButton } from "@/components/back-button";
import { PublicFooter } from "@/components/public-footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | Job Tracker",
  description:
    "Terms and Conditions for Job Tracker — the rules for accessing and using our job-hunt management platform.",
};

const tocLinks = [
  { label: "Agreement to our legal terms", href: "#agreement" },
  { label: "1. Our services", href: "#services" },
  { label: "2. Intellectual property rights", href: "#ip" },
  { label: "3. User representations", href: "#userreps" },
  { label: "4. User registration", href: "#userreg" },
  { label: "5. Prohibited activities", href: "#prohibited" },
  { label: "6. User generated contributions", href: "#ugc" },
  { label: "7. Contribution licence", href: "#license" },
  { label: "8. Services management", href: "#sitemanage" },
  { label: "9. Privacy policy", href: "#ppyes" },
  { label: "10. Term and termination", href: "#terms" },
  { label: "11. Modifications and interruptions", href: "#modifications" },
  { label: "12. Governing law", href: "#law" },
  { label: "13. Dispute resolution", href: "#disputes" },
  { label: "14. Corrections", href: "#corrections" },
  { label: "15. Disclaimer", href: "#disclaimer" },
  { label: "16. Limitations of liability", href: "#liability" },
  { label: "17. Indemnification", href: "#indemnification" },
  { label: "18. User data", href: "#userdata" },
  {
    label: "19. Electronic communications, transactions, and signatures",
    href: "#electronic",
  },
  { label: "20. Miscellaneous", href: "#misc" },
  { label: "21. Contact us", href: "#contact" },
] as const;

const linkClassName =
  "text-primary underline underline-offset-4 transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const subheadingClassName =
  "mb-2 mt-6 font-heading text-sm uppercase tracking-[0.12em] text-card-foreground";

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <main className="flex w-full flex-1 justify-center p-6 md:p-10">
        <article className="w-full max-w-3xl rounded-none border border-border bg-card p-6 md:p-10">
          <header className="mb-8 border-b border-border pb-6">
            <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
              {"// LEGAL"}
            </p>
            <h1 className="font-heading text-3xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_12px_rgba(0,255,65,0.5)]">
              Terms and Conditions
            </h1>
            <p className="mt-3 font-mono text-xs tracking-wider text-muted-foreground">
              Last updated September 15, 2026
            </p>
            <BackButton className="mt-5" />
          </header>

          <div className="space-y-8 font-mono text-sm leading-relaxed text-muted-foreground">
            <section aria-labelledby="agreement">
              <h2
                id="agreement"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                Agreement to our legal terms
              </h2>
              <p>
                We are{" "}
                <strong className="text-card-foreground">Job Tracker</strong> (
                <strong className="text-card-foreground">Company</strong>,{" "}
                <strong className="text-card-foreground">we</strong>,{" "}
                <strong className="text-card-foreground">us</strong>, or{" "}
                <strong className="text-card-foreground">our</strong>).
              </p>
              <p className="mt-4">
                We operate the website{" "}
                <a
                  href="https://job-tracker-khaki-five.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  https://job-tracker-khaki-five.vercel.app
                </a>{" "}
                (the <strong className="text-card-foreground">Site</strong>), as
                well as any other related products and services that refer or
                link to these legal terms (the{" "}
                <strong className="text-card-foreground">Legal Terms</strong>)
                (collectively, the{" "}
                <strong className="text-card-foreground">Services</strong>).
              </p>
              <p className="mt-4">
                A platform that allows users to manage their entire job hunt in
                one place — from bookmarking interesting positions to tracking
                interview rounds and analyzing your pipeline with data-driven
                insights.
              </p>
              <p className="mt-4">
                You can contact us by email at{" "}
                <a
                  href="mailto:ionut.saft14@gmail.com"
                  className={linkClassName}
                >
                  ionut.saft14@gmail.com
                </a>
                .
              </p>
              <p className="mt-4">
                These Legal Terms constitute a legally binding agreement made
                between you, whether personally or on behalf of an entity (
                <strong className="text-card-foreground">you</strong>), and Job
                Tracker, concerning your access to and use of the Services. You
                agree that by accessing the Services, you have read, understood,
                and agreed to be bound by all of these Legal Terms. If you do
                not agree with all of these Legal Terms, then you are expressly
                prohibited from using the Services and you must discontinue use
                immediately.
              </p>
              <p className="mt-4">
                Supplemental terms and conditions or documents that may be
                posted on the Services from time to time are hereby expressly
                incorporated herein by reference. We reserve the right, in our
                sole discretion, to make changes or modifications to these Legal
                Terms from time to time. We will alert you about any changes by
                updating the &quot;Last updated&quot; date of these Legal Terms,
                and you waive any right to receive specific notice of each such
                change. It is your responsibility to periodically review these
                Legal Terms to stay informed of updates. You will be subject to,
                and will be deemed to have been made aware of and to have
                accepted, the changes in any revised Legal Terms by your
                continued use of the Services after the date such revised Legal
                Terms are posted.
              </p>
              <p className="mt-4">
                The Services are intended for users who are at least 18 years
                old. Persons under the age of 18 are not permitted to use or
                register for the Services.
              </p>
              <p className="mt-4">
                We recommend that you print a copy of these Legal Terms for your
                records.
              </p>
            </section>

            <section aria-labelledby="toc">
              <h2
                id="toc"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                Table of contents
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-6 marker:text-primary">
                {tocLinks.map((t) => (
                  <li key={t.href}>
                    <a href={t.href} className={linkClassName}>
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="services">
              <h2
                id="services"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                1. Our services
              </h2>
              <p>
                The information provided when using the Services is not intended
                for distribution to or use by any person or entity in any
                jurisdiction or country where such distribution or use would be
                contrary to law or regulation or which would subject us to any
                registration requirement within such jurisdiction or country.
                Accordingly, those persons who choose to access the Services
                from other locations do so on their own initiative and are
                solely responsible for compliance with local laws, if and to the
                extent local laws are applicable.
              </p>
            </section>

            <section aria-labelledby="ip">
              <h2
                id="ip"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                2. Intellectual property rights
              </h2>
              <h3 className={subheadingClassName}>Our intellectual property</h3>
              <p>
                We are the owner or the licensee of all intellectual property
                rights in our Services, including all source code, databases,
                functionality, software, website designs, audio, video, text,
                photographs, and graphics in the Services (collectively, the{" "}
                <strong className="text-card-foreground">Content</strong>), as
                well as the trademarks, service marks, and logos contained
                therein (the{" "}
                <strong className="text-card-foreground">Marks</strong>).
              </p>
              <p className="mt-4">
                Our Content and Marks are protected by copyright and trademark
                laws (and various other intellectual property rights and unfair
                competition laws) and treaties around the world.
              </p>
              <p className="mt-4">
                The Content and Marks are provided in or through the Services
                &quot;AS IS&quot; for your personal, non-commercial use or
                internal business purpose only.
              </p>
              <h3 className={subheadingClassName}>Your use of our Services</h3>
              <p>
                Subject to your compliance with these Legal Terms, including the{" "}
                <a href="#prohibited" className={linkClassName}>
                  Prohibited Activities
                </a>{" "}
                section below, we grant you a non-exclusive, non-transferable,
                revocable licence to:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                <li>access the Services; and</li>
                <li>
                  download or print a copy of any portion of the Content to
                  which you have properly gained access,
                </li>
              </ul>
              <p className="mt-4">
                solely for your personal, non-commercial use or internal
                business purpose.
              </p>
              <p className="mt-4">
                Except as set out in this section or elsewhere in our Legal
                Terms, no part of the Services and no Content or Marks may be
                copied, reproduced, aggregated, republished, uploaded, posted,
                publicly displayed, encoded, translated, transmitted,
                distributed, sold, licensed, or otherwise exploited for any
                commercial purpose whatsoever, without our express prior written
                permission.
              </p>
              <p className="mt-4">
                If you wish to make any use of the Services, Content, or Marks
                other than as set out in this section or elsewhere in our Legal
                Terms, please address your request to:{" "}
                <a
                  href="mailto:ionut.saft14@gmail.com"
                  className={linkClassName}
                >
                  ionut.saft14@gmail.com
                </a>
                . If we ever grant you the permission to post, reproduce, or
                publicly display any part of our Services or Content, you must
                identify us as the owners or licensors of the Services, Content,
                or Marks and ensure that any copyright or proprietary notice
                appears or is visible on posting, reproducing, or displaying our
                Content.
              </p>
              <p className="mt-4">
                We reserve all rights not expressly granted to you in and to the
                Services, Content, and Marks.
              </p>
              <p className="mt-4">
                Any breach of these Intellectual Property Rights will constitute
                a material breach of our Legal Terms and your right to use our
                Services will terminate immediately.
              </p>
              <h3 className={subheadingClassName}>
                Your submissions and contributions
              </h3>
              <p>
                Please review this section and the{" "}
                <a href="#prohibited" className={linkClassName}>
                  Prohibited Activities
                </a>{" "}
                section carefully prior to using our Services to understand the
                (a) rights you give us and (b) obligations you have when you
                post or upload any content through the Services.
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">Submissions:</strong>{" "}
                By directly sending us any question, comment, suggestion, idea,
                feedback, or other information about the Services (
                <strong className="text-card-foreground">Submissions</strong>
                ), you agree to assign to us all intellectual property rights in
                such Submission. You agree that we shall own this Submission and
                be entitled to its unrestricted use and dissemination for any
                lawful purpose, commercial or otherwise, without acknowledgment
                or compensation to you.
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">Contributions:</strong>{" "}
                The Services may invite you to chat, contribute to, or
                participate in blogs, message boards, online forums, and other
                functionality during which you may create, submit, post,
                display, transmit, publish, distribute, or broadcast content and
                materials to us or through the Services, including but not
                limited to text, writings, video, audio, photographs, music,
                graphics, comments, reviews, rating suggestions, personal
                information, or other material (
                <strong className="text-card-foreground">Contributions</strong>
                ). Any Submission that is publicly posted shall also be treated
                as a Contribution.
              </p>
              <p className="mt-4">
                You understand that Contributions may be viewable by other users
                of the Services.
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">
                  When you post Contributions, you grant us a licence (including
                  use of your name, trademarks, and logos):
                </strong>{" "}
                By posting any Contributions, you grant us an unrestricted,
                unlimited, irrevocable, perpetual, non-exclusive, transferable,
                royalty-free, fully-paid, worldwide right, and licence to: use,
                copy, reproduce, distribute, sell, resell, publish, broadcast,
                retitle, store, publicly perform, publicly display, reformat,
                translate, excerpt (in whole or in part), and exploit your
                Contributions (including, without limitation, your image, name,
                and voice) for any purpose, commercial, advertising, or
                otherwise, to prepare derivative works of, or incorporate into
                other works, your Contributions, and to sublicence the licences
                granted in this section. Our use and distribution may occur in
                any media formats and through any media channels.
              </p>
              <p className="mt-4">
                This licence includes our use of your name, company name, and
                franchise name, as applicable, and any of the trademarks,
                service marks, trade names, logos, and personal and commercial
                images you provide.
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">
                  You are responsible for what you post or upload:
                </strong>{" "}
                By sending us Submissions and/or posting Contributions through
                any part of the Services or making Contributions accessible
                through the Services by linking your account through the
                Services to any of your social networking accounts, you:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                <li>
                  confirm that you have read and agree with our{" "}
                  <a href="#prohibited" className={linkClassName}>
                    Prohibited Activities
                  </a>{" "}
                  and will not post, send, publish, upload, or transmit through
                  the Services any Submission nor post any Contribution that is
                  illegal, harassing, hateful, harmful, defamatory, obscene,
                  bullying, abusive, discriminatory, threatening to any person
                  or group, sexually explicit, false, inaccurate, deceitful, or
                  misleading;
                </li>
                <li>
                  to the extent permissible by applicable law, waive any and all
                  moral rights to any such Submission and/or Contribution;
                </li>
                <li>
                  warrant that any such Submission and/or Contributions are
                  original to you or that you have the necessary rights and
                  licences to submit such Submissions and/or Contributions and
                  that you have full authority to grant us the above-mentioned
                  rights in relation to your Submissions and/or Contributions;
                  and
                </li>
                <li>
                  warrant and represent that your Submissions and/or
                  Contributions do not constitute confidential information.
                </li>
              </ul>
              <p className="mt-4">
                You are solely responsible for your Submissions and/or
                Contributions and you expressly agree to reimburse us for any
                and all losses that we may suffer because of your breach of (a)
                this section, (b) any third party&apos;s intellectual property
                rights, or (c) applicable law.
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">
                  We may remove or edit your Content:
                </strong>{" "}
                Although we have no obligation to monitor any Contributions, we
                shall have the right to remove or edit any Contributions at any
                time without notice if in our reasonable opinion we consider
                such Contributions harmful or in breach of these Legal Terms. If
                we remove or edit any such Contributions, we may also suspend or
                disable your account and report you to the authorities.
              </p>
            </section>

            <section aria-labelledby="userreps">
              <h2
                id="userreps"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                3. User representations
              </h2>
              <p>
                By using the Services, you represent and warrant that: (1) all
                registration information you submit will be true, accurate,
                current, and complete; (2) you will maintain the accuracy of
                such information and promptly update such registration
                information as necessary; (3) you have the legal capacity and
                you agree to comply with these Legal Terms; (4) you are not a
                minor in the jurisdiction in which you reside; (5) you will not
                access the Services through automated or non-human means,
                whether through a bot, script or otherwise; (6) you will not use
                the Services for any illegal or unauthorised purpose; and (7)
                your use of the Services will not violate any applicable law or
                regulation.
              </p>
              <p className="mt-4">
                If you provide any information that is untrue, inaccurate, not
                current, or incomplete, we have the right to suspend or
                terminate your account and refuse any and all current or future
                use of the Services (or any portion thereof).
              </p>
            </section>

            <section aria-labelledby="userreg">
              <h2
                id="userreg"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                4. User registration
              </h2>
              <p>
                You may be required to register to use the Services. You agree
                to keep your password confidential and will be responsible for
                all use of your account and password. We reserve the right to
                remove, reclaim, or change a username you select if we
                determine, in our sole discretion, that such username is
                inappropriate, obscene, or otherwise objectionable.
              </p>
            </section>

            <section aria-labelledby="prohibited">
              <h2
                id="prohibited"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                5. Prohibited activities
              </h2>
              <p>
                You may not access or use the Services for any purpose other
                than that for which we make the Services available. The Services
                may not be used in connection with any commercial endeavours
                except those that are specifically endorsed or approved by us.
              </p>
              <p className="mt-4">
                As a user of the Services, you agree not to:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                <li>
                  Systematically retrieve data or other content from the
                  Services to create or compile, directly or indirectly, a
                  collection, compilation, database, or directory without
                  written permission from us.
                </li>
                <li>
                  Trick, defraud, or mislead us and other users, especially in
                  any attempt to learn sensitive account information such as
                  user passwords.
                </li>
                <li>
                  Circumvent, disable, or otherwise interfere with
                  security-related features of the Services, including features
                  that prevent or restrict the use or copying of any Content or
                  enforce limitations on the use of the Services and/or the
                  Content contained therein.
                </li>
                <li>
                  Disparage, tarnish, or otherwise harm, in our opinion, us
                  and/or the Services.
                </li>
                <li>
                  Use any information obtained from the Services in order to
                  harass, abuse, or harm another person.
                </li>
                <li>
                  Make improper use of our support services or submit false
                  reports of abuse or misconduct.
                </li>
                <li>
                  Use the Services in a manner inconsistent with any applicable
                  laws or regulations.
                </li>
                <li>
                  Engage in unauthorised framing of or linking to the Services.
                </li>
                <li>
                  Upload or transmit (or attempt to upload or to transmit)
                  viruses, Trojan horses, or other material, including excessive
                  use of capital letters and spamming (continuous posting of
                  repetitive text), that interferes with any party&apos;s
                  uninterrupted use and enjoyment of the Services or modifies,
                  impairs, disrupts, alters, or interferes with the use,
                  features, functions, operation, or maintenance of the
                  Services.
                </li>
                <li>
                  Engage in any automated use of the system, such as using
                  scripts to send comments or messages, or using any data
                  mining, robots, or similar data gathering and extraction
                  tools.
                </li>
                <li>
                  Delete the copyright or other proprietary rights notice from
                  any Content.
                </li>
                <li>
                  Attempt to impersonate another user or person or use the
                  username of another user.
                </li>
                <li>
                  Upload or transmit (or attempt to upload or to transmit) any
                  material that acts as a passive or active information
                  collection or transmission mechanism, including without
                  limitation, clear graphics interchange formats
                  (&quot;gifs&quot;), 1x1 pixels, web bugs, cookies, or other
                  similar devices (sometimes referred to as &quot;spyware&quot;
                  or &quot;passive collection mechanisms&quot; or
                  &quot;pcms&quot;).
                </li>
                <li>
                  Interfere with, disrupt, or create an undue burden on the
                  Services or the networks or services connected to the
                  Services.
                </li>
                <li>
                  Harass, annoy, intimidate, or threaten any of our employees or
                  agents engaged in providing any portion of the Services to
                  you.
                </li>
                <li>
                  Attempt to bypass any measures of the Services designed to
                  prevent or restrict access to the Services, or any portion of
                  the Services.
                </li>
                <li>
                  Copy or adapt the Services&apos; software, including but not
                  limited to Flash, PHP, HTML, JavaScript, or other code.
                </li>
                <li>
                  Except as permitted by applicable law, decipher, decompile,
                  disassemble, or reverse engineer any of the software
                  comprising or in any way making up a part of the Services.
                </li>
                <li>
                  Except as may be the result of standard search engine or
                  Internet browser usage, use, launch, develop, or distribute
                  any automated system, including without limitation, any
                  spider, robot, cheat utility, scraper, or offline reader that
                  accesses the Services, or use or launch any unauthorised
                  script or other software.
                </li>
                <li>
                  Use a buying agent or purchasing agent to make purchases on
                  the Services.
                </li>
                <li>
                  Make any unauthorised use of the Services, including
                  collecting usernames and/or email addresses of users by
                  electronic or other means for the purpose of sending
                  unsolicited email, or creating user accounts by automated
                  means or under false pretences.
                </li>
                <li>
                  Use the Services as part of any effort to compete with us or
                  otherwise use the Services and/or the Content for any
                  revenue-generating endeavour or commercial enterprise.
                </li>
              </ul>
            </section>

            <section aria-labelledby="ugc">
              <h2
                id="ugc"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                6. User generated contributions
              </h2>
              <p>
                The Services may invite you to chat, contribute to, or
                participate in blogs, message boards, online forums, and other
                functionality, and may provide you with the opportunity to
                create, submit, post, display, transmit, perform, publish,
                distribute, or broadcast content and materials to us or on the
                Services, including but not limited to text, writings, video,
                audio, photographs, graphics, comments, suggestions, or personal
                information or other material (collectively,{" "}
                <strong className="text-card-foreground">Contributions</strong>
                ). Contributions may be viewable by other users of the Services
                and through third-party websites. As such, any Contributions you
                transmit may be treated as non-confidential and non-proprietary.
                When you create or make available any Contributions, you thereby
                represent and warrant that:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                <li>
                  The creation, distribution, transmission, public display, or
                  performance, and the accessing, downloading, or copying of
                  your Contributions do not and will not infringe the
                  proprietary rights, including but not limited to the
                  copyright, patent, trademark, trade secret, or moral rights of
                  any third party.
                </li>
                <li>
                  You are the creator and owner of or have the necessary
                  licences, rights, consents, releases, and permissions to use
                  and to authorise us, the Services, and other users of the
                  Services to use your Contributions in any manner contemplated
                  by the Services and these Legal Terms.
                </li>
                <li>
                  You have the written consent, release, and/or permission of
                  each and every identifiable individual person in your
                  Contributions to use the name or likeness of each and every
                  such identifiable individual person to enable inclusion and
                  use of your Contributions in any manner contemplated by the
                  Services and these Legal Terms.
                </li>
                <li>
                  Your Contributions are not false, inaccurate, or misleading.
                </li>
                <li>
                  Your Contributions are not unsolicited or unauthorised
                  advertising, promotional materials, pyramid schemes, chain
                  letters, spam, mass mailings, or other forms of solicitation.
                </li>
                <li>
                  Your Contributions are not obscene, lewd, lascivious, filthy,
                  violent, harassing, libellous, slanderous, or otherwise
                  objectionable (as determined by us).
                </li>
                <li>
                  Your Contributions do not ridicule, mock, disparage,
                  intimidate, or abuse anyone.
                </li>
                <li>
                  Your Contributions are not used to harass or threaten (in the
                  legal sense of those terms) any other person and to promote
                  violence against a specific person or class of people.
                </li>
                <li>
                  Your Contributions do not violate any applicable law,
                  regulation, or rule.
                </li>
                <li>
                  Your Contributions do not violate the privacy or publicity
                  rights of any third party.
                </li>
                <li>
                  Your Contributions do not violate any applicable law
                  concerning child pornography, or otherwise intended to protect
                  the health or well-being of minors.
                </li>
                <li>
                  Your Contributions do not include any offensive comments that
                  are connected to race, national origin, gender, sexual
                  preference, or physical handicap.
                </li>
                <li>
                  Your Contributions do not otherwise violate, or link to
                  material that violates, any provision of these Legal Terms, or
                  any applicable law or regulation.
                </li>
              </ul>
              <p className="mt-4">
                Any use of the Services in violation of the foregoing violates
                these Legal Terms and may result in, among other things,
                termination or suspension of your rights to use the Services.
              </p>
            </section>

            <section aria-labelledby="license">
              <h2
                id="license"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                7. Contribution licence
              </h2>
              <p>
                By posting your Contributions to any part of the Services, you
                automatically grant, and you represent and warrant that you have
                the right to grant, to us an unrestricted, unlimited,
                irrevocable, perpetual, non-exclusive, transferable,
                royalty-free, fully-paid, worldwide right, and licence to host,
                use, copy, reproduce, disclose, sell, resell, publish,
                broadcast, retitle, archive, store, cache, publicly perform,
                publicly display, reformat, translate, transmit, excerpt (in
                whole or in part), and distribute such Contributions (including,
                without limitation, your image and voice) for any purpose,
                commercial, advertising, or otherwise, and to prepare derivative
                works of, or incorporate into other works, such Contributions,
                and grant and authorise sublicences of the foregoing. The use
                and distribution may occur in any media formats and through any
                media channels.
              </p>
              <p className="mt-4">
                This licence will apply to any form, media, or technology now
                known or hereafter developed, and includes our use of your name,
                company name, and franchise name, as applicable, and any of the
                trademarks, service marks, trade names, logos, and personal and
                commercial images you provide. You waive all moral rights in
                your Contributions, and you warrant that moral rights have not
                otherwise been asserted in your Contributions.
              </p>
              <p className="mt-4">
                We do not assert any ownership over your Contributions. You
                retain full ownership of all of your Contributions and any
                intellectual property rights or other proprietary rights
                associated with your Contributions. We are not liable for any
                statements or representations in your Contributions provided by
                you in any area on the Services. You are solely responsible for
                your Contributions to the Services and you expressly agree to
                exonerate us from any and all responsibility and to refrain from
                any legal action against us regarding your Contributions.
              </p>
              <p className="mt-4">
                We have the right, in our sole and absolute discretion, (1) to
                edit, redact, or otherwise change any Contributions; (2) to
                re-categorise any Contributions to place them in more
                appropriate locations on the Services; and (3) to pre-screen or
                delete any Contributions at any time and for any reason, without
                notice. We have no obligation to monitor your Contributions.
              </p>
            </section>

            <section aria-labelledby="sitemanage">
              <h2
                id="sitemanage"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                8. Services management
              </h2>
              <p>
                We reserve the right, but not the obligation, to: (1) monitor
                the Services for violations of these Legal Terms; (2) take
                appropriate legal action against anyone who, in our sole
                discretion, violates the law or these Legal Terms, including
                without limitation, reporting such user to law enforcement
                authorities; (3) in our sole discretion and without limitation,
                refuse, restrict access to, limit the availability of, or
                disable (to the extent technologically feasible) any of your
                Contributions or any portion thereof; (4) in our sole discretion
                and without limitation, notice, or liability, to remove from the
                Services or otherwise disable all files and content that are
                excessive in size or are in any way burdensome to our systems;
                and (5) otherwise manage the Services in a manner designed to
                protect our rights and property and to facilitate the proper
                functioning of the Services.
              </p>
            </section>

            <section aria-labelledby="ppyes">
              <h2
                id="ppyes"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                9. Privacy policy
              </h2>
              <p>
                We care about data privacy and security. Please review our
                Privacy Policy:{" "}
                <a
                  href="https://job-tracker-khaki-five.vercel.app/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  https://job-tracker-khaki-five.vercel.app/privacy
                </a>
                . By using the Services, you agree to be bound by our Privacy
                Policy, which is incorporated into these Legal Terms. Please be
                advised the Services are hosted in Romania. If you access the
                Services from any other region of the world with laws or other
                requirements governing personal data collection, use, or
                disclosure that differ from applicable laws in Romania, then
                through your continued use of the Services, you are transferring
                your data to Romania, and you expressly consent to have your
                data transferred to and processed in Romania. You can also read
                our{" "}
                <Link href="/privacy" className={linkClassName}>
                  Privacy Policy
                </Link>{" "}
                here.
              </p>
            </section>

            <section aria-labelledby="terms">
              <h2
                id="terms"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                10. Term and termination
              </h2>
              <p>
                These Legal Terms shall remain in full force and effect while
                you use the Services. Without limiting any other provision of
                these Legal Terms, we reserve the right to, in our sole
                discretion and without notice or liability, deny access to and
                use of the Services (including blocking certain IP addresses),
                to any person for any reason or for no reason, including without
                limitation for breach of any representation, warranty, or
                covenant contained in these Legal Terms or of any applicable law
                or regulation. We may terminate your use or participation in the
                Services or delete your account and any content or information
                that you posted at any time, without warning, in our sole
                discretion.
              </p>
              <p className="mt-4">
                If we terminate or suspend your account for any reason, you are
                prohibited from registering and creating a new account under
                your name, a fake or borrowed name, or the name of any third
                party, even if you may be acting on behalf of the third party.
                In addition to terminating or suspending your account, we
                reserve the right to take appropriate legal action, including
                without limitation pursuing civil, criminal, and injunctive
                redress.
              </p>
            </section>

            <section aria-labelledby="modifications">
              <h2
                id="modifications"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                11. Modifications and interruptions
              </h2>
              <p>
                We reserve the right to change, modify, or remove the contents
                of the Services at any time or for any reason at our sole
                discretion without notice. However, we have no obligation to
                update any information on our Services. We will not be liable to
                you or any third party for any modification, price change,
                suspension, or discontinuance of the Services.
              </p>
              <p className="mt-4">
                We cannot guarantee the Services will be available at all times.
                We may experience hardware, software, or other problems or need
                to perform maintenance related to the Services, resulting in
                interruptions, delays, or errors. We reserve the right to
                change, revise, update, suspend, discontinue, or otherwise
                modify the Services at any time or for any reason without notice
                to you. You agree that we have no liability whatsoever for any
                loss, damage, or inconvenience caused by your inability to
                access or use the Services during any downtime or discontinuance
                of the Services. Nothing in these Legal Terms will be construed
                to obligate us to maintain and support the Services or to supply
                any corrections, updates, or releases in connection therewith.
              </p>
            </section>

            <section aria-labelledby="law">
              <h2
                id="law"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                12. Governing law
              </h2>
              <p>
                These Legal Terms are governed by and interpreted following the
                laws of Romania, and the use of the United Nations Convention of
                Contracts for the International Sales of Goods is expressly
                excluded. If your habitual residence is in the EU, and you are a
                consumer, you additionally possess the protection provided to
                you by obligatory provisions of the law in your country of
                residence. Job Tracker and yourself both agree to submit to the
                non-exclusive jurisdiction of the courts of Romania, which means
                that you may make a claim to defend your consumer protection
                rights in regards to these Legal Terms in Romania, or in the EU
                country in which you reside.
              </p>
            </section>

            <section aria-labelledby="disputes">
              <h2
                id="disputes"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                13. Dispute resolution
              </h2>
              <h3 className={subheadingClassName}>Informal negotiations</h3>
              <p>
                To expedite resolution and control the cost of any dispute,
                controversy, or claim related to these Legal Terms (each a{" "}
                <strong className="text-card-foreground">Dispute</strong> and
                collectively, the{" "}
                <strong className="text-card-foreground">Disputes</strong>)
                brought by either you or us (individually, a{" "}
                <strong className="text-card-foreground">Party</strong> and
                collectively, the{" "}
                <strong className="text-card-foreground">Parties</strong>), the
                Parties agree to first attempt to negotiate any Dispute (except
                those Disputes expressly provided below) informally for at least
                30 days before initiating arbitration. Such informal
                negotiations commence upon written notice from one Party to the
                other Party.
              </p>
              <h3 className={subheadingClassName}>Binding arbitration</h3>
              <p>
                Any dispute arising from the relationships between the Parties
                to these Legal Terms shall be determined by one arbitrator who
                will be chosen in accordance with the Arbitration and Internal
                Rules of the European Court of Arbitration being part of the
                European Centre of Arbitration having its seat in Strasbourg,
                and which are in force at the time the application for
                arbitration is filed, and of which adoption of this clause
                constitutes acceptance. The seat of arbitration shall be
                Romania. The language of the proceedings shall be English.
                Applicable rules of substantive law shall be the law of Romania.
              </p>
              <h3 className={subheadingClassName}>Restrictions</h3>
              <p>
                The Parties agree that any arbitration shall be limited to the
                Dispute between the Parties individually. To the full extent
                permitted by law, (a) no arbitration shall be joined with any
                other proceeding; (b) there is no right or authority for any
                Dispute to be arbitrated on a class-action basis or to utilise
                class action procedures; and (c) there is no right or authority
                for any Dispute to be brought in a purported representative
                capacity on behalf of the general public or any other persons.
              </p>
              <h3 className={subheadingClassName}>
                Exceptions to informal negotiations and arbitration
              </h3>
              <p>
                The Parties agree that the following Disputes are not subject to
                the above provisions concerning informal negotiations and
                binding arbitration: (a) any Disputes seeking to enforce or
                protect, or concerning the validity of, any of the intellectual
                property rights of a Party; (b) any Dispute related to, or
                arising from, allegations of theft, piracy, invasion of privacy,
                or unauthorised use; and (c) any claim for injunctive relief. If
                this provision is found to be illegal or unenforceable, then
                neither Party will elect to arbitrate any Dispute falling within
                that portion of this provision found to be illegal or
                unenforceable and such Dispute shall be decided by a court of
                competent jurisdiction within the courts listed for jurisdiction
                above, and the Parties agree to submit to the personal
                jurisdiction of that court.
              </p>
            </section>

            <section aria-labelledby="corrections">
              <h2
                id="corrections"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                14. Corrections
              </h2>
              <p>
                There may be information on the Services that contains
                typographical errors, inaccuracies, or omissions, including
                descriptions, pricing, availability, and various other
                information. We reserve the right to correct any errors,
                inaccuracies, or omissions and to change or update the
                information on the Services at any time, without prior notice.
              </p>
            </section>

            <section aria-labelledby="disclaimer">
              <h2
                id="disclaimer"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                15. Disclaimer
              </h2>
              <p>
                The Services are provided on an as-is and as-available basis.
                You agree that your use of the Services will be at your sole
                risk. To the fullest extent permitted by law, we disclaim all
                warranties, express or implied, in connection with the Services
                and your use thereof, including, without limitation, the implied
                warranties of merchantability, fitness for a particular purpose,
                and non-infringement. We make no warranties or representations
                about the accuracy or completeness of the Services&apos; content
                or the content of any websites or mobile applications linked to
                the Services and we will assume no liability or responsibility
                for any (1) errors, mistakes, or inaccuracies of content and
                materials, (2) personal injury or property damage, of any nature
                whatsoever, resulting from your access to and use of the
                Services, (3) any unauthorised access to or use of our secure
                servers and/or any and all personal information and/or financial
                information stored therein, (4) any interruption or cessation of
                transmission to or from the Services, (5) any bugs, viruses,
                Trojan horses, or the like which may be transmitted to or
                through the Services by any third party, and/or (6) any errors
                or omissions in any content and materials or for any loss or
                damage of any kind incurred as a result of the use of any
                content posted, transmitted, or otherwise made available via the
                Services. We do not warrant, endorse, guarantee, or assume
                responsibility for any product or service advertised or offered
                by a third party through the Services, any hyperlinked website,
                or any website or mobile application featured in any banner or
                other advertising, and we will not be a party to or in any way
                be responsible for monitoring any transaction between you and
                any third-party providers of products or services. As with the
                purchase of a product or service through any medium or in any
                environment, you should use your best judgement and exercise
                caution where appropriate.
              </p>
            </section>

            <section aria-labelledby="liability">
              <h2
                id="liability"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                16. Limitations of liability
              </h2>
              <p>
                In no event will we or our directors, employees, or agents be
                liable to you or any third party for any direct, indirect,
                consequential, exemplary, incidental, special, or punitive
                damages, including lost profit, lost revenue, loss of data, or
                other damages arising from your use of the Services, even if we
                have been advised of the possibility of such damages.
              </p>
            </section>

            <section aria-labelledby="indemnification">
              <h2
                id="indemnification"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                17. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold us harmless, including
                our subsidiaries, affiliates, and all of our respective
                officers, agents, partners, and employees, from and against any
                loss, damage, liability, claim, or demand, including reasonable
                attorneys&apos; fees and expenses, made by any third party due
                to or arising out of: (1) your Contributions; (2) use of the
                Services; (3) breach of these Legal Terms; (4) any breach of
                your representations and warranties set forth in these Legal
                Terms; (5) your violation of the rights of a third party,
                including but not limited to intellectual property rights; or
                (6) any overt harmful act toward any other user of the Services
                with whom you connected via the Services. Notwithstanding the
                foregoing, we reserve the right, at your expense, to assume the
                exclusive defence and control of any matter for which you are
                required to indemnify us, and you agree to cooperate, at your
                expense, with our defence of such claims. We will use reasonable
                efforts to notify you of any such claim, action, or proceeding
                which is subject to this indemnification upon becoming aware of
                it.
              </p>
            </section>

            <section aria-labelledby="userdata">
              <h2
                id="userdata"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                18. User data
              </h2>
              <p>
                We will maintain certain data that you transmit to the Services
                for the purpose of managing the performance of the Services, as
                well as data relating to your use of the Services. Although we
                perform regular routine backups of data, you are solely
                responsible for all data that you transmit or that relates to
                any activity you have undertaken using the Services. You agree
                that we shall have no liability to you for any loss or
                corruption of any such data, and you hereby waive any right of
                action against us arising from any such loss or corruption of
                such data.
              </p>
            </section>

            <section aria-labelledby="electronic">
              <h2
                id="electronic"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                19. Electronic communications, transactions, and signatures
              </h2>
              <p>
                Visiting the Services, sending us emails, and completing online
                forms constitute electronic communications. You consent to
                receive electronic communications, and you agree that all
                agreements, notices, disclosures, and other communications we
                provide to you electronically, via email and on the Services,
                satisfy any legal requirement that such communication be in
                writing. You hereby agree to the use of electronic signatures,
                contracts, orders, and other records, and to electronic delivery
                of notices, policies, and records of transactions initiated or
                completed by us or via the Services. You hereby waive any rights
                or requirements under any statutes, regulations, rules,
                ordinances, or other laws in any jurisdiction which require an
                original signature or delivery or retention of non-electronic
                records, or to payments or the granting of credits by any means
                other than electronic means.
              </p>
            </section>

            <section aria-labelledby="misc">
              <h2
                id="misc"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                20. Miscellaneous
              </h2>
              <p>
                These Legal Terms and any policies or operating rules posted by
                us on the Services or in respect to the Services constitute the
                entire agreement and understanding between you and us. Our
                failure to exercise or enforce any right or provision of these
                Legal Terms shall not operate as a waiver of such right or
                provision. These Legal Terms operate to the fullest extent
                permissible by law. We may assign any or all of our rights and
                obligations to others at any time. We shall not be responsible
                or liable for any loss, damage, delay, or failure to act caused
                by any cause beyond our reasonable control. If any provision or
                part of a provision of these Legal Terms is determined to be
                unlawful, void, or unenforceable, that provision or part of the
                provision is deemed severable from these Legal Terms and does
                not affect the validity and enforceability of any remaining
                provisions. There is no joint venture, partnership, employment
                or agency relationship created between you and us as a result of
                these Legal Terms or use of the Services. You agree that these
                Legal Terms will not be construed against us by virtue of having
                drafted them. You hereby waive any and all defences you may have
                based on the electronic form of these Legal Terms and the lack
                of signing by the parties hereto to execute these Legal Terms.
              </p>
            </section>

            <section aria-labelledby="contact">
              <h2
                id="contact"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                21. Contact us
              </h2>
              <p>
                In order to resolve a complaint regarding the Services or to
                receive further information regarding use of the Services,
                please contact us at:
              </p>
              <p className="mt-4 text-card-foreground">Job Tracker</p>
              <p>
                <a
                  href="mailto:ionut.saft14@gmail.com"
                  className={linkClassName}
                >
                  ionut.saft14@gmail.com
                </a>
              </p>
            </section>

            <footer className="border-t border-border pt-6 text-xs">
              <p>
                This Terms and Conditions was created using Termly&apos;s{" "}
                <a
                  href="https://termly.io/products/terms-and-conditions-generator/"
                  target="_blank"
                  rel="noopener external"
                  className={linkClassName}
                >
                  Terms and Conditions Generator
                </a>
              </p>
            </footer>

            <nav
              aria-label="Related legal pages"
              className="border-t border-border pt-6 font-mono text-xs"
            >
              See also:{" "}
              <Link href="/cookies" className={linkClassName}>
                Cookie Policy
              </Link>{" "}
              ·{" "}
              <Link href="/privacy" className={linkClassName}>
                Privacy Policy
              </Link>
            </nav>
          </div>
        </article>
      </main>
      <PublicFooter />
      <BackToTopButton />
    </div>
  );
}
