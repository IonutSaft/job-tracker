import type { Metadata } from "next";
import Link from "next/link";
import { BackToTopButton } from "@/components/back-to-top-button";
import { BackButton } from "@/components/back-button";
import { PublicFooter } from "@/components/public-footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Job Tracker",
  description:
    "Privacy Policy for Job Tracker — how we collect, use, share, and protect your personal information.",
};

const tocLinks = [
  { label: "1. What information do we collect?", href: "#infocollect" },
  { label: "2. How do we process your information?", href: "#infouse" },
  {
    label:
      "3. What legal bases do we rely on to process your personal information?",
    href: "#legalbases",
  },
  {
    label: "4. When and with whom do we share your personal information?",
    href: "#whoshare",
  },
  {
    label: "5. Do we use cookies and other tracking technologies?",
    href: "#cookies",
  },
  { label: "6. How do we handle your social logins?", href: "#sociallogins" },
  { label: "7. How long do we keep your information?", href: "#inforetain" },
  { label: "8. How do we keep your information safe?", href: "#infosafe" },
  { label: "9. Do we collect information from minors?", href: "#infominors" },
  { label: "10. What are your privacy rights?", href: "#privacyrights" },
  { label: "11. Controls for do-not-track features", href: "#dnt" },
  { label: "12. Do we make updates to this notice?", href: "#updates" },
  { label: "13. How can you contact us about this notice?", href: "#contact" },
  {
    label:
      "14. How can you review, update, or delete the data we collect from you?",
    href: "#request",
  },
] as const;

const authorityLinks = [
  {
    label: "Member State data protection authority",
    href: "https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm",
  },
  {
    label: "UK data protection authority",
    href: "https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/",
  },
  {
    label: "Federal Data Protection and Information Commissioner",
    href: "https://www.edoeb.admin.ch/edoeb/en/home.html",
  },
] as const;

const linkClassName =
  "text-primary underline underline-offset-4 transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <main className="flex w-full flex-1 justify-center p-6 md:p-10">
        <article className="w-full max-w-3xl rounded-none border border-border bg-card p-6 md:p-10">
          <header className="mb-8 border-b border-border pb-6">
            <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
              {"// LEGAL"}
            </p>
            <h1 className="font-heading text-3xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_12px_rgba(0,255,65,0.5)]">
              Privacy Policy
            </h1>
            <p className="mt-3 font-mono text-xs tracking-wider text-muted-foreground">
              Last updated September 15, 2026
            </p>
            <BackButton className="mt-5" />
          </header>

          <div className="space-y-8 font-mono text-sm leading-relaxed text-muted-foreground">
            <section aria-labelledby="intro">
              <h2 id="intro" className="sr-only">
                Introduction
              </h2>
              <p>
                This Privacy Notice for Job Tracker (
                <strong className="text-card-foreground">we</strong>,{" "}
                <strong className="text-card-foreground">us</strong>, or{" "}
                <strong className="text-card-foreground">our</strong>),
                describes how and why we might access, collect, store, use,
                and/or share (
                <strong className="text-card-foreground">process</strong>) your
                personal information when you use our services (
                <strong className="text-card-foreground">Services</strong>),
                including when you:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                <li>
                  Visit our website at{" "}
                  <a
                    href="https://job-tracker-khaki-five.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    https://job-tracker-khaki-five.vercel.app
                  </a>{" "}
                  or any website of ours that links to this Privacy Notice
                </li>
                <li>
                  Use Job Tracker. A platform that allows users to manage their
                  entire job hunt in one place — from bookmarking interesting
                  positions to tracking interview rounds and analyzing your
                  pipeline with data-driven insights.
                </li>
                <li>
                  Engage with us in other related ways, including any marketing
                  or events
                </li>
              </ul>
              <p className="mt-4">
                Questions or concerns? Reading this Privacy Notice will help you
                understand your privacy rights and choices. We are responsible
                for making decisions about how your personal information is
                processed. If you do not agree with our policies and practices,
                please do not use our Services.
              </p>
            </section>

            <section aria-labelledby="summary">
              <h2
                id="summary"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                Summary of key points
              </h2>
              <p>
                This summary provides key points from our Privacy Notice, but
                you can find out more details about any of these topics by
                clicking the link following each key point or by using our table
                of contents below to find the section you are looking for.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                <li>
                  <strong className="text-card-foreground">
                    What personal information do we process?
                  </strong>{" "}
                  When you visit, use, or navigate our Services, we may process
                  personal information depending on how you interact with us and
                  the Services, the choices you make, and the products and
                  features you use. Learn more about{" "}
                  <a href="#infocollect" className={linkClassName}>
                    personal information you disclose to us
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-card-foreground">
                    Do we process any sensitive personal information?
                  </strong>{" "}
                  Some of the information may be considered special or sensitive
                  in certain jurisdictions, for example your racial or ethnic
                  origins, sexual orientation, and religious beliefs. We do not
                  process sensitive personal information.
                </li>
                <li>
                  <strong className="text-card-foreground">
                    Do we collect any information from third parties?
                  </strong>{" "}
                  We do not collect any information from third parties.
                </li>
                <li>
                  <strong className="text-card-foreground">
                    How do we process your information?
                  </strong>{" "}
                  We process your information to provide, improve, and
                  administer our Services, communicate with you, for security
                  and fraud prevention, and to comply with law. We may also
                  process your information for other purposes with your consent.
                  We process your information only when we have a valid legal
                  reason to do so. Learn more about{" "}
                  <a href="#infouse" className={linkClassName}>
                    how we process your information
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-card-foreground">
                    In what situations and with which parties do we share
                    personal information?
                  </strong>{" "}
                  We may share information in specific situations and with
                  specific third parties. Learn more about{" "}
                  <a href="#whoshare" className={linkClassName}>
                    when and with whom we share your personal information
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-card-foreground">
                    How do we keep your information safe?
                  </strong>{" "}
                  We have adequate organisational and technical processes and
                  procedures in place to protect your personal information.
                  However, no electronic transmission over the internet or
                  information storage technology can be guaranteed to be 100%
                  secure. Learn more about{" "}
                  <a href="#infosafe" className={linkClassName}>
                    how we keep your information safe
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-card-foreground">
                    What are your rights?
                  </strong>{" "}
                  Depending on where you are located geographically, the
                  applicable privacy law may mean you have certain rights
                  regarding your personal information. Learn more about{" "}
                  <a href="#privacyrights" className={linkClassName}>
                    your privacy rights
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-card-foreground">
                    How do you exercise your rights?
                  </strong>{" "}
                  The easiest way to exercise your rights is by submitting a{" "}
                  <a
                    href="https://app.termly.io/dsar/d0feb8fa-19d4-4b23-86e2-0c3d74253f46"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    data subject access request
                  </a>
                  , or by contacting us. We will consider and act upon any
                  request in accordance with applicable data protection laws.
                </li>
              </ul>
              <p className="mt-4">
                Want to learn more about what we do with any information we
                collect?{" "}
                <a href="#toc" className={linkClassName}>
                  Review the Privacy Notice in full
                </a>
                .
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

            <section aria-labelledby="infocollect">
              <h2
                id="infocollect"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                1. What information do we collect?
              </h2>
              <p>
                <strong className="text-card-foreground">
                  Personal information you disclose to us
                </strong>
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">In Short:</strong> We
                collect personal information that you provide to us.
              </p>
              <p className="mt-4">
                We collect personal information that you voluntarily provide to
                us when you register on the Services, express an interest in
                obtaining information about us or our products and Services,
                when you participate in activities on the Services, or otherwise
                when you contact us.
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">
                  Personal Information Provided by You.
                </strong>{" "}
                The personal information that we collect depends on the context
                of your interactions with us and the Services, the choices you
                make, and the products and features you use. The personal
                information we collect may include the following:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                <li>email addresses</li>
                <li>usernames</li>
                <li>passwords</li>
              </ul>
              <p className="mt-4">
                <strong className="text-card-foreground">
                  Sensitive Information.
                </strong>{" "}
                We do not process sensitive information.
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">
                  Social Media Login Data.
                </strong>{" "}
                We may provide you with the option to register with us using
                your existing social media account details, like your Facebook,
                X, or other social media account. If you choose to register in
                this way, we will collect certain profile information about you
                from the social media provider, as described in the section
                called{" "}
                <a href="#sociallogins" className={linkClassName}>
                  How do we handle your social logins?
                </a>{" "}
                below.
              </p>
              <p className="mt-4">
                All personal information that you provide to us must be true,
                complete, and accurate, and you must notify us of any changes to
                such personal information.
              </p>
            </section>

            <section aria-labelledby="infouse">
              <h2
                id="infouse"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                2. How do we process your information?
              </h2>
              <p>
                <strong className="text-card-foreground">In Short:</strong> We
                process your information to provide, improve, and administer our
                Services, communicate with you, for security and fraud
                prevention, and to comply with law. We may also process your
                information for other purposes with your consent.
              </p>
              <p className="mt-4">
                We process your personal information for a variety of reasons,
                depending on how you interact with our Services, including:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                <li>
                  <strong className="text-card-foreground">
                    To facilitate account creation and authentication and
                    otherwise manage user accounts.
                  </strong>{" "}
                  We may process your information so you can create and log in
                  to your account, as well as keep your account in working
                  order.
                </li>
                <li>
                  <strong className="text-card-foreground">
                    To save or protect an individual&apos;s vital interest.
                  </strong>{" "}
                  We may process your information when necessary to save or
                  protect an individual&apos;s vital interest, such as to
                  prevent harm.
                </li>
              </ul>
            </section>

            <section aria-labelledby="legalbases">
              <h2
                id="legalbases"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                3. What legal bases do we rely on to process your information?
              </h2>
              <p>
                <strong className="text-card-foreground">In Short:</strong> We
                only process your personal information when we believe it is
                necessary and we have a valid legal reason (i.e. legal basis) to
                do so under applicable law, like with your consent, to comply
                with laws, to provide you with services to enter into or fulfil
                our contractual obligations, to protect your rights, or to
                fulfil our legitimate business interests.
              </p>
              <p className="mt-4">
                The General Data Protection Regulation (GDPR) and UK GDPR
                require us to explain the valid legal bases we rely on in order
                to process your personal information. As such, we may rely on
                the following legal bases to process your personal information:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                <li>
                  <strong className="text-card-foreground">Consent.</strong> We
                  may process your information if you have given us permission
                  (i.e. consent) to use your personal information for a specific
                  purpose. You can withdraw your consent at any time. Learn more
                  about{" "}
                  <a href="#withdrawconsent" className={linkClassName}>
                    withdrawing your consent
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-card-foreground">
                    Legal Obligations.
                  </strong>{" "}
                  We may process your information where we believe it is
                  necessary for compliance with our legal obligations, such as
                  to cooperate with a law enforcement body or regulatory agency,
                  exercise or defend our legal rights, or disclose your
                  information as evidence in litigation in which we are
                  involved.
                </li>
                <li>
                  <strong className="text-card-foreground">
                    Vital Interests.
                  </strong>{" "}
                  We may process your information where we believe it is
                  necessary to protect your vital interests or the vital
                  interests of a third party, such as situations involving
                  potential threats to the safety of any person.
                </li>
              </ul>
            </section>

            <section aria-labelledby="whoshare">
              <h2
                id="whoshare"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                4. When and with whom do we share your personal information?
              </h2>
              <p>
                <strong className="text-card-foreground">In Short:</strong> We
                may share information in specific situations described in this
                section and/or with the following third parties.
              </p>
              <p className="mt-4">
                We may need to share your personal information in the following
                situations:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                <li>
                  <strong className="text-card-foreground">
                    Business Transfers.
                  </strong>{" "}
                  We may share or transfer your information in connection with,
                  or during negotiations of, any merger, sale of company assets,
                  financing, or acquisition of all or a portion of our business
                  to another company.
                </li>
              </ul>
            </section>

            <section aria-labelledby="cookies">
              <h2
                id="cookies"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                5. Do we use cookies and other tracking technologies?
              </h2>
              <p>
                <strong className="text-card-foreground">In Short:</strong> We
                may use cookies and other tracking technologies to collect and
                store your information.
              </p>
              <p className="mt-4">
                We may use cookies and similar tracking technologies (like web
                beacons and pixels) to gather information when you interact with
                our Services. Some online tracking technologies help us maintain
                the security of our Services and your account, prevent crashes,
                fix bugs, save your preferences, and assist with basic site
                functions. We also permit third parties and service providers to
                use online tracking technologies on our Services for analytics
                and advertising, including to help manage and display
                advertisements or to tailor advertisements to your interests.
              </p>
              <p className="mt-4">
                The third parties and service providers use their technology to
                provide advertising about products and services tailored to your
                interests which may appear either on our Services or on other
                websites. Specific information about how we use such
                technologies and how you can refuse certain cookies is set out
                in our{" "}
                <Link href="/cookies" className={linkClassName}>
                  Cookie Policy
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="sociallogins">
              <h2
                id="sociallogins"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                6. How do we handle your social logins?
              </h2>
              <p>
                <strong className="text-card-foreground">In Short:</strong> If
                you choose to register or log in to our Services using a social
                media account, we may have access to certain information about
                you.
              </p>
              <p className="mt-4">
                Our Services offer you the ability to register and log in using
                your third-party social media account details (like your
                Facebook or X logins). Where you choose to do this, we will
                receive certain profile information about you from your social
                media provider. The profile information we receive may vary
                depending on the social media provider concerned, but will often
                include your name, email address, friends list, and profile
                picture, as well as other information you choose to make public
                on such a social media platform.
              </p>
              <p className="mt-4">
                We will use the information we receive only for the purposes
                that are described in this Privacy Notice or that are otherwise
                made clear to you on the relevant Services. Please note that we
                do not control, and are not responsible for, other uses of your
                personal information by your third-party social media provider.
                We recommend that you review their privacy notice to understand
                how they collect, use, and share your personal information, and
                how you can set your privacy preferences on their sites and
                apps.
              </p>
            </section>

            <section aria-labelledby="inforetain">
              <h2
                id="inforetain"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                7. How long do we keep your information?
              </h2>
              <p>
                <strong className="text-card-foreground">In Short:</strong> We
                keep your information for as long as necessary to fulfil the
                purposes outlined in this Privacy Notice unless otherwise
                required by law.
              </p>
              <p className="mt-4">
                We will only keep your personal information for as long as it is
                necessary for the purposes set out in this Privacy Notice,
                unless a longer retention period is required or permitted by law
                (such as tax, accounting, or other legal requirements). No
                purpose in this notice will require us keeping your personal
                information for longer than the period of time in which users
                have an account with us.
              </p>
              <p className="mt-4">
                When we have no ongoing legitimate business need to process your
                personal information, we will either delete or anonymise such
                information, or, if this is not possible (for example, because
                your personal information has been stored in backup archives),
                then we will securely store your personal information and
                isolate it from any further processing until deletion is
                possible.
              </p>
            </section>

            <section aria-labelledby="infosafe">
              <h2
                id="infosafe"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                8. How do we keep your information safe?
              </h2>
              <p>
                <strong className="text-card-foreground">In Short:</strong> We
                aim to protect your personal information through a system of
                organisational and technical security measures.
              </p>
              <p className="mt-4">
                We have implemented appropriate and reasonable technical and
                organisational security measures designed to protect the
                security of any personal information we process. However,
                despite our safeguards and efforts to secure your information,
                no electronic transmission over the Internet or information
                storage technology can be guaranteed to be 100% secure, so we
                cannot promise or guarantee that hackers, cybercriminals, or
                other unauthorised third parties will not be able to defeat our
                security and improperly collect, access, steal, or modify your
                information.
              </p>
              <p className="mt-4">
                Although we will do our best to protect your personal
                information, transmission of personal information to and from
                our Services is at your own risk. You should only access the
                Services within a secure environment.
              </p>
            </section>

            <section aria-labelledby="infominors">
              <h2
                id="infominors"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                9. Do we collect information from minors?
              </h2>
              <p>
                <strong className="text-card-foreground">In Short:</strong> We
                do not knowingly collect data from or market to children under
                18 years of age.
              </p>
              <p className="mt-4">
                We do not knowingly collect, solicit data from, or market to
                children under 18 years of age, nor do we knowingly sell such
                personal information. By using the Services, you represent that
                you are at least 18 or that you are the parent or guardian of
                such a minor and consent to such minor dependent&apos;s use of
                the Services. If we learn that personal information from users
                less than 18 years of age has been collected, we will deactivate
                the account and take reasonable measures to promptly delete such
                data from our records. If you become aware of any data we may
                have collected from children under age 18, please contact us at{" "}
                <a
                  href="mailto:ionut.saft14@gmail.com"
                  className={linkClassName}
                >
                  ionut.saft14@gmail.com
                </a>
                .
              </p>
            </section>

            <section aria-labelledby="privacyrights">
              <h2
                id="privacyrights"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                10. What are your privacy rights?
              </h2>
              <p>
                <strong className="text-card-foreground">In Short:</strong> In
                some regions, such as the European Economic Area (EEA), United
                Kingdom (UK), and Switzerland, you have rights that allow you
                greater access to and control over your personal information.
                You may review, change, or terminate your account at any time,
                depending on your country, province, or state of residence.
              </p>
              <p className="mt-4">
                In some regions (like the EEA, UK, and Switzerland), you have
                certain rights under applicable data protection laws. These may
                include the right (i) to request access and obtain a copy of
                your personal information, (ii) to request rectification or
                erasure; (iii) to restrict the processing of your personal
                information; (iv) if applicable, to data portability; and (v)
                not to be subject to automated decision-making. In certain
                circumstances, you may also have the right to object to the
                processing of your personal information. You can make such a
                request by contacting us by using the contact details provided
                in the section{" "}
                <a href="#contact" className={linkClassName}>
                  How can you contact us about this notice?
                </a>{" "}
                below.
              </p>
              <p className="mt-4">
                We will consider and act upon any request in accordance with
                applicable data protection laws. If you are located in the UK
                and are unhappy with how we have handled your personal
                information, you can make a complaint directly to us. This is in
                addition to the rights you have under the UK General Data
                Protection Regulation and the Data Protection Act 2018.
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">
                  How to contact us: what happens after you complain.
                </strong>{" "}
                We will acknowledge your complaint within 30 days of receiving
                it. We will investigate without unjustifiable or excessive
                delay. We will keep you informed of progress and explain the
                outcome. If you are not happy with our final response, you can
                refer your complaint to the Information Commissioner&apos;s
                Office, the UK supervisory authority. Website:{" "}
                <a
                  href="http://ico.org.uk/make-a-complaint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  ico.org.uk/make-a-complaint
                </a>{" "}
                Helpline: 0303 123 1113. Post: Information Commissioner&apos;s
                Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF.
              </p>
              <p className="mt-4">
                If you are located in the EEA or UK and you believe we are
                unlawfully processing your personal information, you also have
                the right to complain to your{" "}
                {authorityLinks.map((a, i) => (
                  <span key={a.href}>
                    {i > 0 && (i === authorityLinks.length - 1 ? " or " : ", ")}
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    >
                      {a.label}
                    </a>
                  </span>
                ))}
                . If you are located in Switzerland, you may contact the{" "}
                <a
                  href="https://www.edoeb.admin.ch/edoeb/en/home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Federal Data Protection and Information Commissioner
                </a>
                .
              </p>
              <p className="mt-4" id="withdrawconsent">
                <strong className="text-card-foreground">
                  Withdrawing your consent:
                </strong>{" "}
                If we are relying on your consent to process your personal
                information, you have the right to withdraw your consent at any
                time. You can withdraw your consent at any time by contacting us
                by using the contact details provided in the section{" "}
                <a href="#contact" className={linkClassName}>
                  How can you contact us about this notice?
                </a>{" "}
                below. However, please note that this will not affect the
                lawfulness of the processing before its withdrawal nor will it
                affect the processing of your personal information conducted in
                reliance on lawful processing grounds other than consent.
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">
                  Account Information.
                </strong>{" "}
                If you would at any time like to review or change the
                information in your account or terminate your account, you can:
                log in to your account settings and update your user account.
                Upon your request to terminate your account, we will deactivate
                or delete your account and information from our active
                databases. However, we may retain some information in our files
                to prevent fraud, troubleshoot problems, assist with any
                investigations, enforce our legal terms and/or comply with
                applicable legal requirements.
              </p>
              <p className="mt-4">
                <strong className="text-card-foreground">
                  Cookies and similar technologies:
                </strong>{" "}
                Most web browsers are set to accept cookies by default. If you
                prefer, you can usually choose to set your browser to remove
                cookies and to reject cookies. If you choose to remove cookies
                or reject cookies, this could affect certain features or
                services of our Services.
              </p>
            </section>

            <section aria-labelledby="dnt">
              <h2
                id="dnt"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                11. Controls for do-not-track features
              </h2>
              <p>
                Most web browsers and some mobile operating systems and mobile
                applications include a Do-Not-Track (&quot;DNT&quot;) feature or
                setting you can activate to signal your privacy preference not
                to have data about your online browsing activities monitored and
                collected. At this stage, no uniform technology standard for
                recognising and implementing DNT signals has been finalised. As
                such, we do not currently respond to DNT browser signals or any
                other mechanism that automatically communicates your choice not
                to be tracked online. If a standard for online tracking is
                adopted that we must follow in the future, we will inform you
                about that practice in a revised version of this Privacy Notice.
              </p>
            </section>

            <section aria-labelledby="updates">
              <h2
                id="updates"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                12. Do we make updates to this notice?
              </h2>
              <p>
                <strong className="text-card-foreground">In Short:</strong> Yes,
                we will update this notice as necessary to stay compliant with
                relevant laws.
              </p>
              <p className="mt-4">
                We may update this Privacy Notice from time to time. The updated
                version will be indicated by an updated Revised date at the top
                of this Privacy Notice. If we make material changes to this
                Privacy Notice, we may notify you either by prominently posting
                a notice of such changes or by directly sending you a
                notification. We encourage you to review this Privacy Notice
                frequently to be informed of how we are protecting your
                information.
              </p>
            </section>

            <section aria-labelledby="contact">
              <h2
                id="contact"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                13. How can you contact us about this notice?
              </h2>
              <p>
                If you have questions or comments about this notice, you may
                email us at{" "}
                <a
                  href="mailto:ionut.saft14@gmail.com"
                  className={linkClassName}
                >
                  ionut.saft14@gmail.com
                </a>{" "}
                or contact us by post at:
              </p>
              <p className="mt-4 text-card-foreground">Job Tracker</p>
              <p className="text-card-foreground">Job Tracker</p>
            </section>

            <section aria-labelledby="request">
              <h2
                id="request"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                14. How can you review, update, or delete the data we collect
                from you?
              </h2>
              <p>
                Based on the applicable laws of your country, you may have the
                right to request access to the personal information we collect
                from you, details about how we have processed it, correct
                inaccuracies, or delete your personal information. You may also
                have the right to withdraw your consent to our processing of
                your personal information. These rights may be limited in some
                circumstances by applicable law. To request to review, update,
                or delete your personal information, please fill out and submit
                a{" "}
                <a
                  href="https://app.termly.io/dsar/d0feb8fa-19d4-4b23-86e2-0c3d74253f46"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  data subject access request
                </a>
                .
              </p>
            </section>

            <footer className="border-t border-border pt-6 text-xs">
              <p>
                This Privacy Policy was created using Termly&apos;s{" "}
                <a
                  href="https://termly.io/products/privacy-policy-generator/"
                  target="_blank"
                  rel="noopener external"
                  className={linkClassName}
                >
                  Privacy Policy Generator
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
              <Link href="/terms" className={linkClassName}>
                Terms
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
