import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "~/components/ui/code-block";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

/* 
---bm
title: Build Your NFT Project in Minutes
excerpt: How to use the ERC1155 monorepo template to launch your own NFT collection
coverImage: /images/blog/erc1155-nft-template.png
publishedAt: 2025-05-01
featured: false
published: true
tags: web3,ethereum,nft,nextjs,typescript,solidity,hardhat
--- 
*/

export const metadata = {
  title: "Build Your NFT Project in Minutes",
  description:
    "How to use the ERC1155 monorepo template to launch your own NFT collection",
  openGraph: {
    images: [
      {
        url: "/images/blog/erc1155-nft-template.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your NFT Project in Minutes",
    description:
      "How to use the ERC1155 monorepo template to launch your own NFT collection",
    images: ["/images/blog/erc1155-nft-template.png"],
  },
};

export default async function ERC1155NFTTemplate() {
  return (
    <article className="mx-4 flex max-w-3xl flex-col gap-6 md:mx-auto">
      {/* Header */}
      <Image
        src="/images/blog/erc1155-nft-template.png"
        alt="Diagram showing the ERC1155 NFT template architecture with a Next.js frontend connected to a Hardhat smart contract project."
        width={1000}
        height={1000}
        className="mb-2 rounded-lg shadow-md"
      />
      <div className="mb-6 text-center">
        <h1 className="animate-fade-in from-primary to-secondary bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
          Build Your NFT Project in Minutes
        </h1>
        <p className="text-muted-foreground mt-4 text-xl">
          How to use the ERC1155 monorepo template to launch your own NFT
          collection
        </p>
      </div>

      {/* Article Body */}
      <div className="prose prose-lg dark:prose-invert flex max-w-none flex-col gap-12">
        {/* Introduction */}
        <section className="flex flex-col gap-4">
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            The Challenge of Building NFT Projects
          </h2>

          <p>
            Building an NFT project from scratch involves tackling several
            complex components:
          </p>

          <div className="flex flex-col gap-4 md:flex-row">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Smart Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Writing secure Solidity code</li>
                  <li>Testing contract functionality</li>
                  <li>Deploying to testnets and mainnet</li>
                  <li>Verifying contracts on Etherscan</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Frontend & Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Building a minting website</li>
                  <li>Hosting NFT metadata securely</li>
                  <li>Managing token images</li>
                  <li>Connecting to wallets and contracts</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mt-4">
            What if you could skip most of this setup work and focus on creating
            your unique NFT collection? The{" "}
            <strong>ERC1155 Monorepo Template</strong> does exactly that by
            providing a fully-configured development environment with everything
            you need to launch your NFT project.
          </p>
        </section>

        {/* How It Works */}
        <section className="flex flex-col gap-2">
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            Template Architecture
          </h2>

          <h3 className="mt-4 text-xl">1. Turborepo Monorepo Structure</h3>

          <p>
            The template uses Turborepo to organize a monorepo containing both
            the smart contract and frontend code:
          </p>

          <pre className="bg-secondary/10 overflow-auto rounded-md p-4 text-sm">
            {`. 
├── apps/
│ └── frontend/ # Next.js frontend app 
├── packages/ 
│ ├── api/ # tRPC API for metadata  
│ ├── auth/ # Authentication utilities 
│ ├── config/ # Shared config files
│ ├── constants/ # Shared constants including contract addresses 
│ ├── contract/ # Solidity ERC1155 contract and tests 
│ └── db/ # Prisma schema and database utilities 
`}
          </pre>

          <p>
            This structure allows for a clean separation of concerns while
            sharing code between packages.
          </p>

          <h3 className="mt-6 text-xl">2. Smart Contract: ERC1155</h3>

          <p>
            The project includes a standards-compliant ERC1155 contract built
            with OpenZeppelin:
          </p>

          <CodeBlock language="solidity">
            {`// From packages/contract/contracts/standard-erc1155.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract StandardERC1155 is ERC1155, Ownable, Pausable, ERC1155Supply {
    // Contract name and symbol
    string public name;
    string public symbol;
    
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) ERC1155(_uri) {
        name = _name;
        symbol = _symbol;
    }
    
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity
    
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}`}
          </CodeBlock>

          <h3 className="mt-6 text-xl">3. Metadata API</h3>

          <p>
            The frontend serves NFT metadata through a tRPC API, which
            marketplaces and wallets use to display your tokens:
          </p>

          <CodeBlock language="typescript">
            {`// From packages/api/src/router/item.ts

export const itemRouter = createTRPCRouter({
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      // You can fetch from database or return static data
      return {
        id: input.id,
        name: \`NFT #\${input.id}\`,
        description: "A unique collectible NFT",
        image: \`https://your-domain.com/images/\${input.id}.png\`,
        attributes: [
          {
            trait_type: "Rarity",
            value: "Legendary",
          },
          {
            trait_type: "Type",
            value: "Weapon",
          },
        ],
      };
    }),
    
  getAll: publicProcedure.query(async () => {
    // Return all token metadata for your collection
    // This could connect to a database via Prisma
    return [/* token metadata array */];
  }),
});`}
          </CodeBlock>

          <h3 className="mt-6 text-xl">4. Next.js Frontend</h3>

          <p>
            The frontend provides a minting interface for your users and serves
            the metadata API:
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Badge>Metadata API Route</Badge>
              <CodeBlock language="typescript">
                {`// apps/frontend/src/app/api/item/[id]/route.ts
                
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Parse the ID from the URL
  const id = parseInt(params.id);
  
  // Fetch metadata from tRPC
  const caller = appRouter.createCaller({
    prisma, // Prisma client instance
  });
  
  const metadata = await caller.item.byId({ id });
  
  // Return formatted JSON for OpenSea/marketplaces
  return NextResponse.json(metadata);
}`}
              </CodeBlock>
            </div>
            <div>
              <Badge>Minting Component</Badge>
              <CodeBlock language="tsx">{`// apps/frontend/src/components/MintButton.tsx

"use client";

import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractABI, contractAddress } from "@acme/constants";

export function MintButton({ tokenId }: { tokenId: number }) {
  const [quantity, setQuantity] = useState(1);
  
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'mint',
    args: [tokenId, quantity],
  });
  
  const { write, isLoading, isSuccess } = 
    useContractWrite(config);
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="rounded-md border p-2"
        >
          -
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="rounded-md border p-2"
        >
          +
        </button>
      </div>
      
      <button
        onClick={() => write?.()}
        disabled={isLoading || !write}
        className="rounded-md bg-primary px-4 py-2 text-white"
      >
        {isLoading ? "Minting..." : "Mint Now"}
      </button>
    </div>
  );
}`}</CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            Deployment Process
          </h2>

          <p>
            One of the best features of this template is how straightforward the
            deployment process is:
          </p>

          <div className="space-y-4">
            <div className="bg-secondary/10 rounded-md border p-4">
              <h3 className="text-xl font-semibold">1. Deploy the Frontend</h3>
              <p className="mt-2">
                Simply connect your repository to Vercel and deploy with a few
                clicks. The template includes all necessary configuration for
                Vercel deployments.
              </p>
              <CodeBlock language="bash">
                {`# Get the URL after deployment
# e.g. https://your-project.vercel.app`}
              </CodeBlock>
            </div>

            <div className="bg-secondary/10 rounded-md border p-4">
              <h3 className="text-xl font-semibold">
                2. Update the Contract URI
              </h3>
              <p className="mt-2">
                Use your Vercel domain in the deployment script to set the
                correct metadata URI base.
              </p>
              <CodeBlock language="typescript">
                {`// packages/contract/scripts/deploy.ts

const uri = "https://your-project.vercel.app/api/item/{id}";
const nft = await NFT.deploy("MyNFT", "MNFT", uri);`}
              </CodeBlock>
            </div>

            <div className="bg-secondary/10 rounded-md border p-4">
              <h3 className="text-xl font-semibold">3. Deploy the Contract</h3>
              <p className="mt-2">
                The template includes scripts for deploying to Goerli testnet or
                Ethereum mainnet.
              </p>
              <CodeBlock language="bash">
                {`# Deploy to Goerli testnet
turbo 1155:deploy:goerli

# Deploy to mainnet (when ready)
turbo 1155:deploy:mainnet`}
              </CodeBlock>
            </div>

            <div className="bg-secondary/10 rounded-md border p-4">
              <h3 className="text-xl font-semibold">4. Verify the Contract</h3>
              <p className="mt-2">
                The deployment script provides the exact command for verifying
                your contract on Etherscan.
              </p>
              <CodeBlock language="bash">
                {`# Example verification command
npx hardhat verify --network goerli 0x123...ABC "MyNFT" "MNFT" "https://your-project.vercel.app/api/item/{id}"`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            Benefits of This Template
          </h2>

          <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-card flex flex-col gap-2 rounded-xl border p-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/80 flex h-10 w-10 items-center justify-center rounded-full p-3">
                  1
                </div>
                <h3 className="text-xl font-semibold">Rapid Development</h3>
              </div>
              <p className="text-muted-foreground">
                Skip weeks of boilerplate setup and focus on your unique NFT
                collection features instead.
              </p>
            </div>

            <div className="bg-card flex flex-col gap-2 rounded-xl border p-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/80 flex h-10 w-10 items-center justify-center rounded-full p-3">
                  2
                </div>
                <h3 className="text-xl font-semibold">Secure Contracts</h3>
              </div>
              <p className="text-muted-foreground">
                Built with OpenZeppelin&apos;s battle-tested contracts, reducing
                security risks in your NFT project.
              </p>
            </div>

            <div className="bg-card flex flex-col gap-2 rounded-xl border p-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/80 flex h-10 w-10 items-center justify-center rounded-full p-3">
                  3
                </div>
                <h3 className="text-xl font-semibold">Optimized Workflow</h3>
              </div>
              <p className="text-muted-foreground">
                Turborepo configuration enables fast builds and efficient
                development across frontend and contracts.
              </p>
            </div>

            <div className="bg-card flex flex-col gap-2 rounded-xl border p-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/80 flex h-10 w-10 items-center justify-center rounded-full p-3">
                  4
                </div>
                <h3 className="text-xl font-semibold">Modern Tech Stack</h3>
              </div>
              <p className="text-muted-foreground">
                Built with Next.js, TypeScript, tRPC, Prisma, and Hardhat for a
                scalable, maintainable codebase.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            Customization Options
          </h2>

          <p>
            The template is designed to be easily customized for your specific
            NFT project:
          </p>

          <ul className="list-disc space-y-4 pl-5">
            <li>
              <strong>Metadata structure:</strong> Modify the tRPC router to
              return your custom attributes and traits
            </li>
            <li>
              <strong>Database integration:</strong> Connect to a database to
              dynamically serve metadata using the included Prisma setup
            </li>
            <li>
              <strong>Minting logic:</strong> Add custom minting rules,
              whitelist functionality, or reveal mechanics
            </li>
            <li>
              <strong>Frontend design:</strong> Customize the UI to match your
              brand and collection aesthetic
            </li>
            <li>
              <strong>Contract functions:</strong> Extend the contract with
              additional features like royalties or special minting mechanics
            </li>
          </ul>
        </section>

        <section>
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            Get Started Today
          </h2>

          <p>
            The ERC1155 Monorepo Template offers a complete solution for NFT
            project development, allowing you to focus on creating unique assets
            and experiences rather than technical setup.
          </p>

          <p>
            Check out the source code on GitHub and start building your NFT
            project today:
          </p>

          <div className="my-8 flex justify-center">
            <Button asChild>
              <Link
                href="https://github.com/CuriouslyCory/erc1155-monorepo"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
            </Button>
          </div>

          <p>Key files and directories to examine:</p>

          <ul>
            <li>
              <a
                href="https://github.com/CuriouslyCory/erc1155-monorepo/blob/main/packages/contract/contracts/standard-erc1155.sol"
                target="_blank"
                rel="noopener noreferrer"
              >
                packages/contract/contracts/standard-erc1155.sol
              </a>{" "}
              - The ERC1155 smart contract
            </li>
            <li>
              <a
                href="https://github.com/CuriouslyCory/erc1155-monorepo/blob/main/packages/api/src/router/item.ts"
                target="_blank"
                rel="noopener noreferrer"
              >
                packages/api/src/router/item.ts
              </a>{" "}
              - Metadata API implementation
            </li>
            <li>
              <a
                href="https://github.com/CuriouslyCory/erc1155-monorepo/blob/main/packages/constants/src/contract.ts"
                target="_blank"
                rel="noopener noreferrer"
              >
                packages/constants/src/contract.ts
              </a>{" "}
              - Contract addresses and ABIs
            </li>
            <li>
              <a
                href="https://github.com/CuriouslyCory/erc1155-monorepo/blob/main/packages/contract/scripts/deploy.ts"
                target="_blank"
                rel="noopener noreferrer"
              >
                packages/contract/scripts/deploy.ts
              </a>{" "}
              - Contract deployment script
            </li>
          </ul>

          <p className="bg-secondary/20 mt-6 rounded-md p-4">
            <strong>Pro tip:</strong> To see the template in action, visit the{" "}
            <a
              href="https://erc1155-monorepo-frontend.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              demo site
            </a>{" "}
            where you can explore the frontend and metadata API endpoints.
          </p>
        </section>
      </div>
    </article>
  );
}
