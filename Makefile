# ScholarStack Monorepo Master Makefile
# Strict Industry Standard Orchestration for Web, Python Harvester, and Native iOS

SHELL := /bin/bash

# Tool discovery with sensible user-level fallbacks
POETRY ?= $(shell which poetry 2>/dev/null || (test -x $$HOME/.local/bin/poetry && echo "$$HOME/.local/bin/poetry") || echo "poetry")
NPM ?= $(shell which npm 2>/dev/null || echo "npm")
SWIFT ?= $(shell which swift 2>/dev/null || echo "swift")
XCODEBUILD ?= $(shell which xcodebuild 2>/dev/null || echo "xcodebuild")

.PHONY: all dev test test-web test-harvester test-ios test-e2e lint build build-web build-ios seed institutions-migrate institutions-sync up down clean

all: test build

# ==============================================================================
# Development
# ==============================================================================
dev:
	cd apps/scholarpath && $(NPM) install && $(NPM) run dev

up:
	docker compose up -d

down:
	docker compose down

# ==============================================================================
# Testing & Verification
# ==============================================================================
test: test-web test-harvester test-ios
	@echo "All unit and domain test suites passed across Web, Harvester, and iOS!"

test-web:
	@echo "=== [1/3] Running ScholarStack Web Tests (Vitest) ==="
	cd apps/scholarpath && $(NPM) run test

test-harvester:
	@echo "=== [2/3] Running ScholarHarvester Tests (Pytest) ==="
	cd apps/scholarharvester && $(POETRY) run pytest

test-ios:
	@echo "=== [3/3] Running ScholarStack iOS Tests (Swift Testing) ==="
	cd apps/scholarstack-ios && $(SWIFT) test

test-e2e:
	@echo "=== Running ScholarStack Web E2E Tests (Playwright) ==="
	cd apps/scholarpath && $(NPM) run test:e2e

# ==============================================================================
# Code Quality & Linting
# ==============================================================================
lint:
	@echo "=== Linting ScholarStack Web ==="
	cd apps/scholarpath && $(NPM) run lint
	@echo "=== Linting ScholarHarvester (Ruff) ==="
	cd apps/scholarharvester && $(POETRY) run ruff check .

# ==============================================================================
# Builds & Compilation
# ==============================================================================
build: build-web build-ios
	@echo "All production builds succeeded across Web and iOS!"

build-web:
	@echo "=== Building ScholarStack Web (Next.js 15) ==="
	cd apps/scholarpath && $(NPM) run build

build-ios:
	@echo "=== Building ScholarStack iOS (Xcode Simulator) ==="
	$(XCODEBUILD) -project apps/scholarstack-ios/ScholarStack.xcodeproj \
	  -scheme ScholarStack \
	  -destination 'generic/platform=iOS Simulator' \
	  CODE_SIGNING_ALLOWED=NO \
	  build

# ==============================================================================
# Database & Seed Data
# ==============================================================================
seed:
	psql $$SUPABASE_DB_DSN -f supabase/schema.sql

institutions-migrate:
	psql $$SUPABASE_DB_DSN -f supabase/institution_migration.sql

institutions-sync:
	cd apps/scholarharvester && $(POETRY) run scholarharvester institutions sync-scorecard --max-records 3500

clean:
	rm -rf apps/scholarpath/.next
	rm -rf apps/scholarharvester/.pytest_cache apps/scholarharvester/__pycache__
	rm -rf apps/scholarstack-ios/.build
