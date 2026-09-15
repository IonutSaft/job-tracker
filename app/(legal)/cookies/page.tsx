import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/back-button";
import { BackToTopButton } from "@/components/back-to-top-button";
import { PublicFooter } from "@/components/public-footer";

export const metadata: Metadata = {
  title: "Cookie Policy | Job Tracker",
  description:
    "Cookie Policy for Job Tracker — how we use cookies and similar technologies, and how you can control them.",
};

const browserLinks = [
  {
    label: "Chrome",
    href: "https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies",
  },
  {
    label: "Internet Explorer",
    href: "https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d",
  },
  {
    label: "Firefox",
    href: "https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US",
  },
  {
    label: "Safari",
    href: "https://support.apple.com/en-ie/guide/safari/sfri11471/mac",
  },
  {
    label: "Edge",
    href: "https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd",
  },
  {
    label: "Opera",
    href: "https://help.opera.com/en/latest/web-preferences/",
  },
] as const;

const adOptOutLinks = [
  {
    label: "Digital Advertising Alliance",
    href: "http://www.aboutads.info/choices/",
  },
  {
    label: "Digital Advertising Alliance of Canada",
    href: "https://youradchoices.ca/",
  },
  {
    label: "European Interactive Digital Advertising Alliance",
    href: "http://www.youronlinechoices.com/",
  },
] as const;

const linkClassName =
  "text-primary underline underline-offset-4 transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <main className="flex w-full flex-1 justify-center p-6 md:p-10">
        <article className="w-full max-w-3xl rounded-none border border-border bg-card p-6 md:p-10">
          <header className="mb-8 border-b border-border pb-6">
            <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
              {"// LEGAL"}
            </p>
            <h1 className="font-heading text-3xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_12px_rgba(0,255,65,0.5)]">
              Cookie Policy
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
                This Cookie Policy explains how Job Tracker (
                <strong className="text-card-foreground">Company</strong>,{" "}
                <strong className="text-card-foreground">we</strong>,{" "}
                <strong className="text-card-foreground">us</strong>, and{" "}
                <strong className="text-card-foreground">our</strong>) uses
                cookies and similar technologies to recognize you when you visit
                our website at{" "}
                <a
                  href="https://job-tracker-khaki-five.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  https://job-tracker-khaki-five.vercel.app
                </a>{" "}
                (<strong className="text-card-foreground">Website</strong>). It
                explains what these technologies are and why we use them, as
                well as your rights to control our use of them.
              </p>
              <p className="mt-4">
                In some cases we may use cookies to collect personal
                information, or that becomes personal information if we combine
                it with other information. For more information on how we handle
                personal information, see our{" "}
                <Link href="/privacy" className={linkClassName}>
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="what-are-cookies">
              <h2
                id="what-are-cookies"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                What are cookies?
              </h2>
              <p>
                Cookies are small data files that are placed on your computer or
                mobile device when you visit a website. Cookies are widely used
                by website owners in order to make their websites work, or to
                work more efficiently, as well as to provide reporting
                information.
              </p>
              <p className="mt-4">
                Cookies set by the website owner (in this case, Job Tracker) are
                called &quot;first-party cookies.&quot; Cookies set by parties
                other than the website owner are called &quot;third-party
                cookies.&quot; Third-party cookies enable third-party features
                or functionality to be provided on or through the website (e.g.,
                advertising, interactive content, and analytics). The parties
                that set these third-party cookies can recognize your computer
                both when it visits the website in question and also when it
                visits certain other websites.
              </p>
            </section>

            <section aria-labelledby="why-we-use-cookies">
              <h2
                id="why-we-use-cookies"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                Why do we use cookies?
              </h2>
              <p>
                We use first- and third-party cookies for several reasons. Some
                cookies are required for technical reasons in order for our
                Website to operate, and we refer to these as
                &quot;essential&quot; or &quot;strictly necessary&quot; cookies.
                Other cookies also enable us to track and target the interests
                of our users to enhance the experience on our Online Properties.
                Third parties serve cookies through our Website for advertising,
                analytics, and other purposes. This is described in more detail
                below.
              </p>
            </section>

            <section aria-labelledby="control-cookies">
              <h2
                id="control-cookies"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                How can I control cookies?
              </h2>
              <p>
                You have the right to decide whether to accept or reject
                cookies. You can exercise your cookie rights by setting your
                preferences in the Cookie Preference Center. The Cookie
                Preference Center allows you to select which categories of
                cookies you accept or reject. Essential cookies cannot be
                rejected as they are strictly necessary to provide you with
                services.
              </p>
              <p className="mt-4">
                The Cookie Preference Center can be found in the notification
                banner and on our Website. If you choose to reject cookies, you
                may still use our Website though your access to some
                functionality and areas of our Website may be restricted. You
                may also set or amend your web browser controls to accept or
                refuse cookies.
              </p>
              <p className="mt-4">
                The specific types of first- and third-party cookies served
                through our Website and the purposes they perform are described
                in the table below (please note that the specific cookies served
                may vary depending on the specific Online Properties you visit):
              </p>
            </section>

            <section aria-labelledby="control-browser">
              <h2
                id="control-browser"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                How can I control cookies on my browser?
              </h2>
              <p>
                As the means by which you can refuse cookies through your web
                browser controls vary from browser to browser, you should visit
                your browser&apos;s help menu for more information. The
                following is information about how to manage cookies on the most
                popular browsers:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                {browserLinks.map((b) => (
                  <li key={b.label}>
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    >
                      {b.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                In addition, most advertising networks offer you a way to opt
                out of targeted advertising. If you would like to find out more
                information, please visit:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
                {adOptOutLinks.map((b) => (
                  <li key={b.label}>
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    >
                      {b.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="web-beacons">
              <h2
                id="web-beacons"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                What about other tracking technologies, like web beacons?
              </h2>
              <p>
                Cookies are not the only way to recognize or track visitors to a
                website. We may use other, similar technologies from time to
                time, like web beacons (sometimes called &quot;tracking
                pixels&quot; or &quot;clear gifs&quot;). These are tiny graphics
                files that contain a unique identifier that enables us to
                recognize when someone has visited our Website or opened an
                email including them. This allows us, for example, to monitor
                the traffic patterns of users from one page within a website to
                another, to deliver or communicate with cookies, to understand
                whether you have come to the website from an online
                advertisement displayed on a third-party website, to improve
                site performance, and to measure the success of email marketing
                campaigns. In many instances, these technologies are reliant on
                cookies to function properly, and so declining cookies will
                impair their functioning.
              </p>
            </section>

            <section aria-labelledby="flash-cookies">
              <h2
                id="flash-cookies"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                Do you use Flash cookies or Local Shared Objects?
              </h2>
              <p>
                Websites may also use so-called &quot;Flash Cookies&quot; (also
                known as Local Shared Objects or &quot;LSOs&quot;) to, among
                other things, collect and store information about your use of
                our services, fraud prevention, and for other site operations.
              </p>
              <p className="mt-4">
                If you do not want Flash Cookies stored on your computer, you
                can adjust the settings of your Flash player to block Flash
                Cookies storage using the tools contained in the{" "}
                <a
                  href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Website Storage Settings Panel
                </a>
                . You can also control Flash Cookies by going to the{" "}
                <a
                  href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Global Storage Settings Panel
                </a>{" "}
                and following the instructions (which may include instructions
                that explain, for example, how to delete existing Flash Cookies
                (referred to &quot;information&quot; on the Macromedia site),
                how to prevent Flash LSOs from being placed on your computer
                without your being asked, and (for Flash Player 8 and later) how
                to block Flash Cookies that are not being delivered by the
                operator of the page you are on at the time).
              </p>
              <p className="mt-4">
                Please note that setting the Flash Player to restrict or limit
                acceptance of Flash Cookies may reduce or impede the
                functionality of some Flash applications, including,
                potentially, Flash applications used in connection with our
                services or online content.
              </p>
            </section>

            <section aria-labelledby="targeted-advertising">
              <h2
                id="targeted-advertising"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                Do you serve targeted advertising?
              </h2>
              <p>
                Third parties may serve cookies on your computer or mobile
                device to serve advertising through our Website. These companies
                may use information about your visits to this and other websites
                in order to provide relevant advertisements about goods and
                services that you may be interested in. They may also employ
                technology that is used to measure the effectiveness of
                advertisements. They can accomplish this by using cookies or web
                beacons to collect information about your visits to this and
                other sites in order to provide relevant advertisements about
                goods and services of potential interest to you. The information
                collected through this process does not enable us or them to
                identify your name, contact details, or other details that
                directly identify you unless you choose to provide these.
              </p>
            </section>

            <section aria-labelledby="updates">
              <h2
                id="updates"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                How often will you update this Cookie Policy?
              </h2>
              <p>
                We may update this Cookie Policy from time to time in order to
                reflect, for example, changes to the cookies we use or for other
                operational, legal, or regulatory reasons. Please therefore
                revisit this Cookie Policy regularly to stay informed about our
                use of cookies and related technologies.
              </p>
              <p className="mt-4">
                The date at the top of this Cookie Policy indicates when it was
                last updated.
              </p>
            </section>

            <section aria-labelledby="contact">
              <h2
                id="contact"
                className="mb-3 font-heading text-lg uppercase tracking-[0.12em] text-primary"
              >
                Where can I get further information?
              </h2>
              <p>
                If you have any questions about our use of cookies or other
                technologies, please contact us at:
              </p>
              <p className="mt-4 text-card-foreground">Job Tracker</p>
            </section>

            <footer className="border-t border-border pt-6 text-xs">
              <p>
                This Cookie Policy was created using Termly&apos;s{" "}
                <a
                  href="https://termly.io/products/cookie-consent-manager/"
                  target="_blank"
                  rel="noopener external"
                  className={linkClassName}
                >
                  Cookie Consent Manager
                </a>
              </p>
            </footer>

            <nav
              aria-label="Related legal pages"
              className="border-t border-border pt-6 font-mono text-xs"
            >
              See also:{" "}
              <Link href="/privacy" className={linkClassName}>
                Privacy Policy
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
